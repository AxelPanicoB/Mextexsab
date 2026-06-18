<?php
/**
 * Metexsab API — helpers compartidos
 * Réplica en PHP de los middlewares de server/ (Express):
 * seguridad, rate limit, honeypot, Turnstile, validación y envío de correo.
 *
 * Compatible con PHP 7.4+ (hosting compartido cPanel/Neubox).
 */

declare(strict_types=1);

// ── CONFIG ─────────────────────────────────────────────────────────────
// Copia config.php.example como config.php y rellena los valores.
$GLOBALS['MTX_CONFIG'] = is_file(__DIR__ . '/config.php')
    ? (require __DIR__ . '/config.php')
    : [];

function cfg(string $key, $default = null)
{
    $v = $GLOBALS['MTX_CONFIG'][$key] ?? null;
    return ($v === null || $v === '') ? $default : $v;
}

// ── RESPUESTAS ─────────────────────────────────────────────────────────
function send_json(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function security_headers(): void
{
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-Robots-Tag: noindex, nofollow');
    header('Referrer-Policy: strict-origin-when-cross-origin');
}

function require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        send_json(405, ['error' => 'Método no permitido.']);
    }
}

// Si hay header Origin, debe coincidir con la lista permitida (CSRF básico).
// Peticiones same-origin sin header Origin pasan.
function check_origin(): void
{
    $allowed = cfg('ALLOWED_ORIGIN');
    if (!$allowed) {
        return;
    }
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return;
    }
    $list = array_map('trim', explode(',', (string) $allowed));
    if (!in_array($origin, $list, true)) {
        send_json(403, ['error' => 'Origen no permitido.']);
    }
}

// Lee y decodifica el body JSON (límite 10 KB, igual que express.json)
function read_json_body(int $maxBytes = 10240): array
{
    $raw = file_get_contents('php://input', false, null, 0, $maxBytes + 1);
    if ($raw === false || strlen($raw) > $maxBytes) {
        send_json(413, ['error' => 'Cuerpo de la petición demasiado grande.']);
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        send_json(400, ['error' => 'JSON inválido.']);
    }
    return $data;
}

// ── RATE LIMIT (archivos por IP) ───────────────────────────────────────
function rate_limit(string $bucket, int $max, int $windowSeconds, string $message): void
{
    $dir = __DIR__ . '/.ratelimit';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    $file = $dir . '/' . $bucket . '-' . sha1(client_ip()) . '.json';
    $now = time();

    $hits = [];
    if (is_file($file)) {
        $hits = json_decode((string) file_get_contents($file), true);
        if (!is_array($hits)) {
            $hits = [];
        }
        $hits = array_values(array_filter($hits, function ($t) use ($now, $windowSeconds) {
            return is_int($t) && $t > $now - $windowSeconds;
        }));
    }

    if (count($hits) >= $max) {
        send_json(429, ['error' => $message]);
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
}

// ── HONEYPOT ───────────────────────────────────────────────────────────
// El campo "website" es invisible para humanos; si viene lleno es un bot.
// Respondemos éxito falso para que no reintente.
function honeypot(array $body): void
{
    if (!empty($body['website'])) {
        error_log('[Honeypot] Spam bloqueado: ' . client_ip());
        send_json(200, ['status' => 'ok', 'message' => 'Enviado correctamente.']);
    }
}

// ── CLOUDFLARE TURNSTILE ───────────────────────────────────────────────
function verify_turnstile(array $body): void
{
    $secret = cfg('TURNSTILE_SECRET');
    if (!$secret) {
        return; // no configurado: se salta (igual que el middleware Express)
    }

    $token = $body['turnstileToken'] ?? '';
    if (!is_string($token) || $token === '') {
        send_json(400, ['error' => 'Verificación de seguridad requerida.']);
    }

    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
            'secret'   => $secret,
            'response' => $token,
            'remoteip' => client_ip(),
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
    ]);
    $resp = curl_exec($ch);
    curl_close($ch);

    if ($resp === false) {
        // Error de red hacia Cloudflare: no bloqueamos al usuario (fail-open)
        error_log('[Turnstile] Error al verificar (red); se permite la petición');
        return;
    }

    $data = json_decode((string) $resp, true);
    if (empty($data['success'])) {
        send_json(403, ['error' => 'Verificación de seguridad fallida. Intenta de nuevo.']);
    }
}

// ── VALIDACIÓN (espejo de los esquemas Zod en server/middleware/validate.js) ──
// Devuelven el valor limpio, o null si es inválido.
// Se eliminan < y > para prevenir inyección HTML en los correos.

function clean_str($v, int $max, int $min = 0): ?string
{
    if (!is_string($v)) {
        return null;
    }
    $v = trim($v);
    $len = mb_strlen($v);
    if ($len < $min || $len > $max) {
        return null;
    }
    return str_replace(['<', '>'], '', $v);
}

function valid_email($v): ?string
{
    if (!is_string($v)) {
        return null;
    }
    $v = trim($v);
    if (mb_strlen($v) > 200 || filter_var($v, FILTER_VALIDATE_EMAIL) === false) {
        return null;
    }
    return $v;
}

function valid_phone($v): ?string
{
    if (!is_string($v)) {
        return null;
    }
    $v = trim($v);
    $len = mb_strlen($v);
    if ($len < 7 || $len > 20 || !preg_match('/^[\d\s\+\-\(\)]+$/', $v)) {
        return null;
    }
    return $v;
}

// Escape para las plantillas HTML de correo
function esc($str): string
{
    return htmlspecialchars((string) ($str ?? ''), ENT_QUOTES, 'UTF-8');
}

// ── ENVÍO DE CORREO ────────────────────────────────────────────────────
// Usa mail() del hosting (cPanel lo enruta por el MTA local del dominio).
// Si los correos caen en spam, cambiar a PHPMailer con SMTP autenticado.
function send_email(string $subject, string $html, string $replyTo): bool
{
    $to   = (string) cfg('NOTIFY_EMAIL', 'ventas@metexsab.com');
    $from = (string) cfg('FROM_EMAIL', 'noreply@metexsab.com');

    $headers = implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Metexsab Web <' . $from . '>',
        'Reply-To: ' . $replyTo,
    ]);

    $encodedSubject = mb_encode_mimeheader($subject, 'UTF-8', 'B');
    // @: un fallo de mail() ya se maneja con la respuesta 500; sin el supresor
    // el warning rompería los headers si display_errors está activo
    return @mail($to, $encodedSubject, $html, $headers);
}

// Fragmentos comunes de la plantilla de correo (header/footer corporativos)
function email_header(string $badgeText): string
{
    return '
  <!-- HEADER -->
  <tr><td style="background:#1e5c0a;background:linear-gradient(135deg,#1b500a 0%,#2d7a12 60%,#3d9618 100%);padding:26px 36px 22px;border-radius:14px 14px 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>
        <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">METEXSAB</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.55);letter-spacing:0.12em;text-transform:uppercase;margin-top:2px;">Mexicana de Textura y Sabor</div>
      </td>
      <td align="right" valign="middle">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.25);padding:5px 14px;border-radius:20px;">
            <span style="font-size:10px;font-weight:700;color:#fff;letter-spacing:0.08em;text-transform:uppercase;">' . $badgeText . '</span>
          </td>
        </tr></table>
      </td>
    </tr></table>
  </td></tr>

  <!-- ACCENT LINE -->
  <tr><td style="background:#5cb845;height:3px;"></td></tr>';
}

function email_footer(): string
{
    return '
  <!-- FOOTER -->
  <tr><td style="background:#f0f7ed;border:1px solid #d8e8d2;border-top:none;border-radius:0 0 14px 14px;padding:16px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-size:12px;color:#6a8f66;">
        &#128205; Quer&eacute;taro, M&eacute;xico &nbsp;&middot;&nbsp; &#128222; 442 218-0650 &nbsp;&middot;&nbsp; ventas@metexsab.com
      </td>
      <td align="right" style="font-size:11px;color:#99b595;white-space:nowrap;">metexsab.com</td>
    </tr></table>
  </td></tr>';
}

function email_wrap(string $innerRows): string
{
    return '<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef4eb;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef4eb;padding:32px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">
' . $innerRows . '
</table>
</td></tr>
</table>
</body>
</html>';
}

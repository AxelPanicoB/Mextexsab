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

    $nl  = "\r\n";
    $uid = bin2hex(random_bytes(8));
    $related = 'rel_' . $uid;
    $alt     = 'alt_' . $uid;

    // Cuerpo en dos versiones (texto y HTML); si el HTML usa el logo incrustado, el logo va adjunto
    $body = '--' . $alt . $nl
        . 'Content-Type: text/plain; charset=UTF-8' . $nl
        . 'Content-Transfer-Encoding: base64' . $nl . $nl
        . chunk_split(base64_encode(email_text_version($html)), 76, $nl)
        . '--' . $alt . $nl
        . 'Content-Type: text/html; charset=UTF-8' . $nl
        . 'Content-Transfer-Encoding: base64' . $nl . $nl
        . chunk_split(base64_encode($html), 76, $nl)
        . '--' . $alt . '--' . $nl;

    $logo = (strpos($html, 'cid:' . EMAIL_LOGO_CID) !== false) ? @file_get_contents(email_logo_path()) : false;
    if ($logo !== false && $logo !== '') {
        $message = '--' . $related . $nl
            . 'Content-Type: multipart/alternative; boundary="' . $alt . '"' . $nl . $nl
            . $body
            . '--' . $related . $nl
            . 'Content-Type: image/png; name="logo-metexsab.png"' . $nl
            . 'Content-Transfer-Encoding: base64' . $nl
            . 'Content-ID: <' . EMAIL_LOGO_CID . '>' . $nl
            . 'Content-Disposition: inline; filename="logo-metexsab.png"' . $nl . $nl
            . chunk_split(base64_encode($logo), 76, $nl)
            . '--' . $related . '--' . $nl;
        $contentType = 'multipart/related; boundary="' . $related . '"';
    } else {
        $message = $body;
        $contentType = 'multipart/alternative; boundary="' . $alt . '"';
    }

    $headers = implode($nl, [
        'MIME-Version: 1.0',
        'Content-Type: ' . $contentType,
        'From: Metexsab Web <' . $from . '>',
        'Reply-To: ' . $replyTo,
    ]);

    $encodedSubject = mb_encode_mimeheader($subject, 'UTF-8', 'B');
    // @: un fallo de mail() ya se maneja con la respuesta 500; sin el supresor
    // el warning rompería los headers si display_errors está activo
    return @mail($to, $encodedSubject, $message, $headers);
}

// Identificador con el que el HTML del correo apunta al logo incrustado (src="cid:...")
const EMAIL_LOGO_CID = 'logo-metexsab@metexsab.com';

// Archivo del logo dentro del propio sitio: api/ y img/ son carpetas hermanas
function email_logo_path(): string
{
    return dirname(__DIR__) . '/img/email/logo-metexsab.png';
}

// Si el archivo del logo existe, va incrustado en el correo (se ve sin pedir permiso para imágenes);
// si no, se carga desde la dirección pública del sitio.
function email_logo_src(): string
{
    return is_readable(email_logo_path())
        ? 'cid:' . EMAIL_LOGO_CID
        : site_url() . '/img/email/logo-metexsab.png';
}

// Versión en texto plano del correo (para programas que no muestran HTML y para antispam)
function email_text_version(string $html): string
{
    $t = (string) preg_replace('#<(head|style|script)\b.*?</\1>#is', '', $html);
    $t = (string) preg_replace('#<br\s*/?>|</(div|tr|p|h[1-6])>#i', "\n", $t);
    $t = (string) preg_replace('#</td>#i', '  ', $t);
    $t = html_entity_decode(strip_tags($t), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $t = str_replace("\xC2\xA0", ' ', $t);
    $t = (string) preg_replace('/[ \t]+\n/', "\n", $t);
    $t = (string) preg_replace('/\n{3,}/', "\n\n", $t);
    return trim($t) . "\n";
}

// ── PLANTILLAS DE CORREO ────────────────────────────────────────────────
// Dirección pública del sitio: de ahí se carga el logo del correo. En producción es
// https://www.metexsab.com; en el sitio de pruebas se cambia con SITE_URL en config.php.
function site_url(): string
{
    return rtrim((string) cfg('SITE_URL', 'https://www.metexsab.com'), '/');
}

// Fecha y hora de recepción, en español y con la hora del centro de México.
function email_date(): string
{
    $meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
              'septiembre', 'octubre', 'noviembre', 'diciembre'];
    $d = new DateTime('now', new DateTimeZone('America/Mexico_City'));
    $h = (int) $d->format('G');
    $hora12 = ($h % 12 === 0) ? 12 : ($h % 12);
    return $d->format('j') . ' de ' . $meses[(int) $d->format('n') - 1] . ' de ' . $d->format('Y')
        . ', ' . $hora12 . ':' . $d->format('i') . ' ' . ($h >= 12 ? 'p. m.' : 'a. m.');
}

// Solo números del teléfono (para los enlaces tel: y WhatsApp)
function phone_digits(string $phone): string
{
    return (string) preg_replace('/\D+/', '', $phone);
}

// Enlace de WhatsApp al número del solicitante, o null si el número no parece mexicano de 10 dígitos
function wa_link(string $phone): ?string
{
    $d = phone_digits($phone);
    if (strlen($d) === 10) {
        return 'https://wa.me/52' . $d;
    }
    if (strlen($d) === 12 && strpos($d, '52') === 0) {
        return 'https://wa.me/' . $d;
    }
    if (strlen($d) === 13 && strpos($d, '521') === 0) {
        return 'https://wa.me/52' . substr($d, 3);
    }
    return null;
}

// Etiqueta pequeña de sección (SOLICITANTE, PRODUCTOS…)
function email_label(string $text): string
{
    return '<div style="font-size:12px;font-weight:700;color:#4f7a4a;letter-spacing:0.09em;text-transform:uppercase;margin-bottom:8px;">' . $text . '</div>';
}

// Botón que se ve igual en cualquier programa de correo (tabla, sin CSS moderno)
function email_button(string $href, string $label, string $bg): string
{
    return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
        . '<td align="center" style="background:' . $bg . ';border-radius:12px;">'
        . '<a href="' . esc($href) . '" style="display:block;padding:17px 16px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;">' . $label . '</a>'
        . '</td></tr></table>';
}

// Primer nombre para el saludo de la respuesta ("Carlos Axel Panico" -> "Carlos")
function first_name(string $name): string
{
    $parts = preg_split('/\s+/', trim($name));
    return ($parts && $parts[0] !== '') ? $parts[0] : $name;
}

// Botones de respuesta: WhatsApp (si el teléfono sirve) y correo
// $replyBody: texto plano que se precarga en el correo de respuesta (lo que pidió el cliente, listo para citar)
function email_actions(string $email, string $subject, ?string $waHref, string $replyBody = ''): string
{
    $mailto = 'mailto:' . $email . '?subject=' . rawurlencode($subject);
    if ($replyBody !== '') {
        // Los enlaces mailto muy largos fallan en algunos programas: se recorta a un tamaño seguro
        $replyBody = mb_substr($replyBody, 0, 1400);
        $mailto .= '&body=' . rawurlencode(str_replace("\n", "\r\n", $replyBody));
    }
    if ($waHref !== null && $replyBody !== '') {
        // WhatsApp abre el chat con el mensaje ya escrito (el cliente solo lo revisa y lo envía)
        $waHref .= '?text=' . rawurlencode(trim($replyBody));
    }
    $mailBtn = email_button($mailto, '&#9993;&nbsp; Responder por correo', '#2d6e1a');
    $open ='<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:36px;"><tr>';

    if ($waHref === null) {
        return $open . '<td>' . $mailBtn . '</td></tr></table>';
    }
    $waBtn = email_button($waHref, 'Responder por WhatsApp', '#17934d');
    return $open
        . '<td width="49%" valign="top">' . $waBtn . '</td>'
        . '<td width="2%">&nbsp;</td>'
        . '<td width="49%" valign="top">' . $mailBtn . '</td>'
        . '</tr></table>';
}

// Encabezado: franja blanca con el logo y una banda verde con el título de la notificación
function email_header(string $badgeText, string $title = '', string $subtitle = ''): string
{
    $logo = esc(email_logo_src());
    $titleHtml = $title !== ''
        ? '<div style="font-size:30px;font-weight:800;color:#ffffff;line-height:1.2;letter-spacing:-0.02em;">' . $title . '</div>'
        : '';
    $subHtml = $subtitle !== ''
        ? '<div style="font-size:15px;color:#d7edcf;margin-top:10px;line-height:1.5;">' . $subtitle . '</div>'
        : '';

    return '
  <!-- LOGO -->
  <tr><td style="background:#ffffff;padding:24px 36px;border:1px solid #d8e8d2;border-bottom:none;border-radius:18px 18px 0 0;">
    <img src="' . $logo . '" width="300" height="90" alt="METEXSAB — Mexicana de Textura y Sabor" style="display:block;border:0;outline:none;width:300px;height:auto;max-width:100%;">
  </td></tr>

  <!-- TÍTULO -->
  <tr><td style="background:#1e5c0a;background:linear-gradient(135deg,#1b500a 0%,#2d7a12 60%,#3d9618 100%);padding:32px 36px 30px;border-left:1px solid #1e5c0a;border-right:1px solid #1e5c0a;">
    <span style="display:inline-block;background:rgba(255,255,255,0.16);border:1px solid rgba(255,255,255,0.35);color:#ffffff;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:6px 14px;border-radius:20px;margin-bottom:16px;">' . $badgeText . '</span>
    ' . $titleHtml . $subHtml . '
  </td></tr>
  <tr><td style="background:#5cb845;height:4px;line-height:4px;font-size:0;">&nbsp;</td></tr>';
}

function email_footer(): string
{
    return '
  <!-- PIE -->
  <tr><td style="background:#f0f7ed;border:1px solid #d8e8d2;border-top:none;border-radius:0 0 18px 18px;padding:26px 36px;">
    <div style="font-size:15px;color:#4f7a4a;line-height:1.8;">
      <strong style="color:#1e5c0a;">Metexsab</strong> &middot; Mexicana de Textura y Sabor<br>
      &#128205; Quer&eacute;taro, M&eacute;xico &nbsp;&middot;&nbsp; &#128222; 442 218-9635 &nbsp;&middot;&nbsp; WhatsApp 442 279-4146<br>
      ventas@metexsab.com
    </div>
    <div style="font-size:12px;color:#8aa886;margin-top:14px;line-height:1.6;">
      Aviso generado autom&aacute;ticamente desde el formulario de metexsab.com.
      Puedes responder a este correo: la respuesta le llega directamente al solicitante.
    </div>
  </td></tr>';
}

// Marco del correo. $preheader es el texto que algunos programas muestran junto al asunto.
function email_wrap(string $innerRows, string $preheader = ''): string
{
    $pre = $preheader !== ''
        ? '<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#eef4eb;">' . esc($preheader) . '</div>'
        : '';
    return '<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef4eb;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Arial,sans-serif;">
' . $pre . '
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef4eb;padding:32px 14px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;">
' . $innerRows . '
</table>
</td></tr>
</table>
</body>
</html>';
}

// ── CORREO: SOLICITUD DE MUESTRAS ───────────────────────────────────────
// $products: lista de ['name' => , 'sku' => , 'selectedFlavors' => [...]]
function samples_email_html(string $name, string $company, string $email, string $phone, string $address, string $notes, array $products): string
{
    $count  = count($products);
    $plural = $count !== 1 ? 's' : '';

    $rows = '';
    foreach (array_values($products) as $i => $p) {
        $skuHtml = ($p['sku'] ?? '') !== ''
            ? '<div style="font-size:12px;color:#8aa886;margin-top:3px;">SKU: ' . esc($p['sku']) . '</div>'
            : '';

        // Texto plano (una sola línea separada por comas) para que al copiar y pegar quede legible
        $flavorsHtml = !empty($p['selectedFlavors'])
            ? '<div style="font-size:15px;color:#2d6e1a;margin-top:8px;line-height:1.6;"><strong>Sabores:</strong> ' . esc(implode(', ', $p['selectedFlavors'])) . '</div>'
            : '';

        $rows .= '
      <tr style="' . ($i % 2 === 0 ? 'background:#f8fcf6;' : '') . '">
        <td style="padding:16px 20px;' . ($i < $count - 1 ? 'border-bottom:1px solid #e4ede0;' : '') . 'vertical-align:top;">
          <div style="font-size:17px;font-weight:700;color:#1a2733;line-height:1.35;">' . esc($p['name']) . '</div>
          ' . $skuHtml . $flavorsHtml . '
        </td>
      </tr>';
    }

    $notesHtml = $notes !== '' ? '
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;">
      <tr><td style="background:#fafcf8;border:1px solid #dce8d7;border-radius:12px;padding:22px 24px;">
        ' . email_label('Notas o referencias') . '
        <div style="font-size:16px;color:#2a3c2e;line-height:1.7;">' . esc($notes) . '</div>
      </td></tr>
    </table>' : '';

    $tel = strlen(phone_digits($phone)) >= 7 ? 'tel:' . phone_digits($phone) : null;
    $phoneHtml = $tel !== null
        ? '<a href="' . esc($tel) . '" style="color:#1e5c0a;font-weight:600;text-decoration:none;">&#9742;&nbsp; ' . esc($phone) . '</a>'
        : '&#9742;&nbsp; ' . esc($phone);

    // Texto que se precarga al pulsar "Responder por correo"
    $lines = [
        'Hola ' . first_name($name) . ',',
        '',
        'Gracias por tu interés en Metexsab. Recibimos tu solicitud de muestras para ' . $company . ':',
        '',
        'Productos:',
    ];
    foreach ($products as $p) {
        $lines[] = '- ' . $p['name'] . (($p['sku'] ?? '') !== '' ? ' (SKU ' . $p['sku'] . ')' : '');
        if (!empty($p['selectedFlavors'])) {
            $lines[] = '  Sabores: ' . implode(', ', $p['selectedFlavors']);
        }
    }
    array_push($lines, '', 'Dirección de envío:', $address);
    if ($notes !== '') {
        array_push($lines, '', 'Notas: ' . $notes);
    }
    array_push($lines, '', '');
    $reply = implode("\n", $lines);

    $body = '
  <!-- CUERPO -->
  <tr><td style="background:#ffffff;padding:40px 36px 38px;border:1px solid #d8e8d2;border-top:none;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background:#f2fbed;border-left:5px solid #3d9618;padding:22px 26px;border-radius:0 12px 12px 0;">
        ' . email_label('Solicitante') . '
        <div style="font-size:28px;font-weight:800;color:#1a2733;line-height:1.2;">' . esc($name) . '</div>
        <div style="font-size:18px;font-weight:600;color:#4f7a4a;margin-top:6px;">' . esc($company) . '</div>
        <div style="margin-top:14px;font-size:16px;line-height:1.9;color:#3b5a3f;">
          <a href="mailto:' . esc($email) . '" style="color:#1e5c0a;font-weight:600;text-decoration:none;">&#9993;&nbsp; ' . esc($email) . '</a><br>
          ' . $phoneHtml . '
        </div>
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;">
      <tr><td style="background:#fafcf8;border:1px solid #dce8d7;border-radius:12px;padding:22px 24px;">
        ' . email_label('&#128205; Direcci&oacute;n de env&iacute;o de las muestras') . '
        <div style="font-size:17px;color:#1a2733;line-height:1.6;">' . esc($address) . '</div>
      </td></tr>
    </table>

    <div style="margin:34px 0 12px;">
      ' . email_label('Productos solicitados <span style="background:#e5f4df;color:#2d6e1a;padding:3px 11px;border-radius:12px;font-size:12px;letter-spacing:0;margin-left:6px;">' . $count . ' producto' . $plural . '</span>') . '
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4ede0;border-radius:12px;border-spacing:0;">
      ' . $rows . '
    </table>
    ' . $notesHtml . '

    ' . email_actions($email, 'Re: Solicitud de muestras — ' . $name, wa_link($phone), $reply) . '

  </td></tr>';

    $first = isset($products[0]['name']) ? $products[0]['name'] : '';
    $pre   = $name . ' pidió muestra de ' . $count . ' producto' . $plural . ($first !== '' ? ': ' . $first : '');

    return email_wrap(
        email_header('Muestras', 'Nueva solicitud de muestras', 'Recibida el ' . esc(email_date()) . ' &middot; desde metexsab.com')
        . $body . email_footer(),
        $pre
    );
}

// ── CORREO: CONTACTO ────────────────────────────────────────────────────
function contact_email_html(string $name, string $email, string $phone, string $company, string $interest, string $message): string
{
    $companyHtml = $company !== ''
        ? '<div style="font-size:16px;color:#4f7a4a;margin-top:6px;">' . esc($company) . '</div>'
        : '';

    $messageHtml = $message !== '' ? '
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;">
      <tr><td style="background:#fafcf8;border:1px solid #dce8d7;border-radius:12px;padding:22px 24px;">
        ' . email_label('Mensaje') . '
        <div style="font-size:16px;color:#2a3c2e;line-height:1.7;">' . nl2br(esc($message)) . '</div>
      </td></tr>
    </table>' : '';

    $tel = strlen(phone_digits($phone)) >= 7 ? 'tel:' . phone_digits($phone) : null;
    $phoneHtml = $tel !== null
        ? '<a href="' . esc($tel) . '" style="color:#1e5c0a;font-weight:600;text-decoration:none;">' . esc($phone) . '</a>'
        : esc($phone);

    $lines = ['Hola ' . first_name($name) . ',', '', 'Gracias por escribirnos a Metexsab.'];
    if ($interest !== '') {
        array_push($lines, '', 'Área de interés: ' . $interest);
    }
    if ($message !== '') {
        array_push($lines, '', 'Tu mensaje:', $message);
    }
    array_push($lines, '', '');
    $reply = implode("\n", $lines);

    $cell = 'padding:15px 20px;border-bottom:1px solid #e4ede0;';
    $lbl  = 'font-size:12px;font-weight:700;color:#4f7a4a;letter-spacing:0.07em;text-transform:uppercase;width:130px;';

    $body = '
  <!-- CUERPO -->
  <tr><td style="background:#ffffff;padding:40px 36px 38px;border:1px solid #d8e8d2;border-top:none;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background:#f2fbed;border-left:5px solid #3d9618;padding:22px 26px;border-radius:0 12px 12px 0;">
        ' . email_label('Contacto') . '
        <div style="font-size:28px;font-weight:800;color:#1a2733;line-height:1.2;">' . esc($name) . '</div>
        ' . $companyHtml . '
      </td></tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;border:1px solid #e4ede0;border-radius:12px;border-spacing:0;">
      <tr style="background:#f8fcf6;">
        <td style="' . $cell . $lbl . '">Correo</td>
        <td style="' . $cell . 'font-size:16px;"><a href="mailto:' . esc($email) . '" style="color:#1e5c0a;font-weight:600;text-decoration:none;">' . esc($email) . '</a></td>
      </tr>
      <tr>
        <td style="' . $cell . $lbl . '">Tel&eacute;fono</td>
        <td style="' . $cell . 'font-size:16px;color:#1a2733;">' . $phoneHtml . '</td>
      </tr>
      <tr style="background:#f8fcf6;">
        <td style="padding:15px 20px;' . $lbl . '">&Aacute;rea de inter&eacute;s</td>
        <td style="padding:15px 20px;">
          <span style="display:inline-block;background:#e5f4df;color:#2d6e1a;font-size:14px;font-weight:700;padding:5px 16px;border-radius:20px;border:1px solid #bdddb4;">' . esc($interest) . '</span>
        </td>
      </tr>
    </table>
    ' . $messageHtml . '

    ' . email_actions($email, 'Re: Consulta Metexsab — ' . $name, wa_link($phone), $reply) . '

  </td></tr>';

    $pre = $name . ' escribió desde el sitio' . ($interest !== '' ? ' (' . $interest . ')' : '');

    return email_wrap(
        email_header('Contacto', 'Nueva consulta de contacto', 'Recibida el ' . esc(email_date()) . ' &middot; desde metexsab.com')
        . $body . email_footer(),
        $pre
    );
}

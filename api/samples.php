<?php
/**
 * POST /api/samples — solicitud de muestras (carrito)
 * Equivalente PHP de server/routes/samples.js
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';

security_headers();
require_post();
check_origin();
rate_limit('samples', 8, 3600, 'Has excedido el límite de solicitudes de muestras. Intenta en una hora.');

$body = read_json_body();
honeypot($body);
verify_turnstile($body);

// ── VALIDACIÓN (espejo de samplesSchema) ───────────────────────────────
$name    = clean_str($body['name'] ?? null, 100, 2);
$email   = valid_email($body['email'] ?? null);
$phone   = valid_phone($body['phone'] ?? null);
$address = clean_str($body['address'] ?? null, 300, 8);
$notes   = clean_str($body['notes'] ?? '', 1000);

$errors = [];
if ($name === null)    $errors[] = ['field' => 'name',    'message' => 'Nombre inválido (2–100 caracteres).'];
if ($email === null)   $errors[] = ['field' => 'email',   'message' => 'Correo electrónico inválido.'];
if ($phone === null)   $errors[] = ['field' => 'phone',   'message' => 'Teléfono inválido.'];
if ($address === null) $errors[] = ['field' => 'address', 'message' => 'Dirección de envío inválida (mín. 8 caracteres).'];
if ($notes === null)   $errors[] = ['field' => 'notes',   'message' => 'Notas inválidas (máx. 1000 caracteres).'];

$productsIn = $body['products'] ?? null;
$products = [];
if (!is_array($productsIn) || count($productsIn) < 1 || count($productsIn) > 20) {
    $errors[] = ['field' => 'products', 'message' => 'Debes incluir entre 1 y 20 productos.'];
} else {
    foreach (array_values($productsIn) as $i => $p) {
        if (!is_array($p)) {
            $errors[] = ['field' => "products.$i", 'message' => 'Producto inválido.'];
            continue;
        }
        $pid   = clean_str($p['id'] ?? null, 100);
        $pname = clean_str($p['name'] ?? null, 200);
        $sku   = isset($p['sku']) && $p['sku'] !== null ? clean_str($p['sku'], 100) : '';
        if ($pid === null || $pname === null || $sku === null) {
            $errors[] = ['field' => "products.$i", 'message' => 'Producto con datos inválidos.'];
            continue;
        }

        $flavors = [];
        $flavorsIn = $p['selectedFlavors'] ?? [];
        if (!is_array($flavorsIn) || count($flavorsIn) > 20) {
            $errors[] = ['field' => "products.$i.selectedFlavors", 'message' => 'Perfiles inválidos (máx. 20).'];
            continue;
        }
        foreach ($flavorsIn as $f) {
            $cf = clean_str($f, 100);
            if ($cf === null) {
                $errors[] = ['field' => "products.$i.selectedFlavors", 'message' => 'Perfil inválido.'];
                continue 2;
            }
            $flavors[] = $cf;
        }

        $products[] = ['id' => $pid, 'name' => $pname, 'sku' => $sku, 'selectedFlavors' => $flavors];
    }
}

if ($errors) {
    send_json(400, ['error' => 'Datos inválidos.', 'details' => $errors]);
}

// ── PLANTILLA HTML ─────────────────────────────────────────────────────
$productRows = '';
foreach ($products as $i => $p) {
    $skuHtml = $p['sku'] !== ''
        ? '<div style="font-size:11px;color:#8aaa88;margin-top:2px;">SKU: ' . esc($p['sku']) . '</div>'
        : '';

    $flavorsHtml = '';
    if (count($p['selectedFlavors']) > 0) {
        $chips = '';
        foreach ($p['selectedFlavors'] as $f) {
            $chips .= '<span style="display:inline-block;background:#e5f4df;color:#2d6e1a;font-size:11px;font-weight:600;padding:2px 10px;border-radius:12px;border:1px solid #bdddb4;margin:2px 3px 2px 0;">' . esc($f) . '</span>';
        }
        $flavorsHtml = '<div style="margin-top:6px;">' . $chips . '</div>';
    }

    $productRows .= '
    <tr style="' . ($i % 2 === 0 ? 'background:#f8fcf6;' : '') . '">
      <td style="padding:12px 18px;border-bottom:1px solid #e4ede0;vertical-align:top;">
        <div style="font-size:14px;font-weight:700;color:#1a2733;">' . esc($p['name']) . '</div>
        ' . $skuHtml . $flavorsHtml . '
      </td>
    </tr>';
}

$count = count($products);
$plural = $count !== 1 ? 's' : '';

$notesHtml = $notes !== '' ? '
    <!-- NOTES -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;">
      <tr><td style="background:#fafcf8;border:1px solid #dce8d7;border-radius:10px;padding:20px 22px;">
        <div style="font-size:10px;font-weight:700;color:#5a8060;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">Notas adicionales</div>
        <div style="font-size:14px;color:#2a3c2e;line-height:1.75;">' . esc($notes) . '</div>
      </td></tr>
    </table>' : '';

$bodyRow = '
  <!-- BODY -->
  <tr><td style="background:#ffffff;padding:36px;border:1px solid #d8e8d2;border-top:none;">

    <!-- SENDER HIGHLIGHT -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="background:#f2fbed;border-left:4px solid #3d9618;padding:14px 20px;border-radius:0 10px 10px 0;">
        <div style="font-size:10px;color:#5a8060;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Solicitante</div>
        <div style="font-size:21px;font-weight:800;color:#1a2733;line-height:1.2;">' . esc($name) . '</div>
        <table cellpadding="0" cellspacing="0" style="margin-top:6px;"><tr>
          <td style="padding-right:16px;font-size:13px;color:#5a7a60;">
            <a href="mailto:' . esc($email) . '" style="color:#2d6e1a;text-decoration:none;font-weight:600;">' . esc($email) . '</a>
          </td>
          <td style="font-size:13px;color:#5a7a60;">' . esc($phone) . '</td>
        </tr></table>
        <div style="margin-top:8px;font-size:13px;color:#5a7a60;">
          &#128205; <strong style="color:#2a3c2e;">Direcci&oacute;n de env&iacute;o:</strong> ' . esc($address) . '
        </div>
      </td></tr>
    </table>

    <!-- PRODUCTS SECTION -->
    <div style="font-size:11px;font-weight:700;color:#5a8060;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">
      Productos solicitados &nbsp;
      <span style="background:#e5f4df;color:#2d6e1a;padding:2px 10px;border-radius:12px;font-size:10px;">' . $count . ' producto' . $plural . '</span>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4ede0;border-radius:10px;border-spacing:0;overflow:hidden;">
      ' . $productRows . '
    </table>
    ' . $notesHtml . '

    <!-- CTA BUTTON -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
      <tr><td align="center">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="background:#2d6e1a;border-radius:10px;box-shadow:0 4px 14px rgba(45,110,26,0.30);">
            <a href="mailto:' . esc($email) . '?subject=Re%3A%20Solicitud%20de%20muestras%20%E2%80%94%20' . rawurlencode($name) . '"
               style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:-0.01em;">
              Contactar a ' . esc($name) . ' &rarr;
            </a>
          </td>
        </tr></table>
      </td></tr>
    </table>

  </td></tr>';

$html = email_wrap(email_header('&#9879; Solicitud de muestras') . $bodyRow . email_footer());

// ── ENVÍO ──────────────────────────────────────────────────────────────
$subject = "Solicitud de muestras — $name ($count producto$plural)";

if (send_email($subject, $html, $email)) {
    error_log("[Muestras] Email enviado: $name — $count producto(s)");
    send_json(200, ['status' => 'ok', 'message' => '¡Solicitud recibida! Nos pondremos en contacto pronto.']);
}

error_log('[Muestras] Error al enviar email (mail() devolvió false)');
send_json(500, ['error' => 'Error al enviar la solicitud. Por favor intenta de nuevo.']);

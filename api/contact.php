<?php
/**
 * POST /api/contact — formulario de contacto rápido
 * Equivalente PHP de server/routes/contact.js
 */

declare(strict_types=1);

require __DIR__ . '/_lib.php';

security_headers();
require_post();
check_origin();
rate_limit('contact', 10, 3600, 'Has excedido el límite de consultas. Intenta en una hora.');

$body = read_json_body();
honeypot($body);
verify_turnstile($body);

// ── VALIDACIÓN (espejo de contactSchema) ───────────────────────────────
$name     = clean_str($body['name'] ?? null, 100, 2);
$company  = clean_str($body['company'] ?? '', 100);
$email    = valid_email($body['email'] ?? null);
$phone    = valid_phone($body['phone'] ?? null);
$interest = clean_str($body['interest'] ?? '', 200);
$message  = clean_str($body['message'] ?? '', 2000);

$errors = [];
if ($name === null)     $errors[] = ['field' => 'name',     'message' => 'Nombre inválido (2–100 caracteres).'];
if ($company === null)  $errors[] = ['field' => 'company',  'message' => 'Empresa inválida (máx. 100 caracteres).'];
if ($email === null)    $errors[] = ['field' => 'email',    'message' => 'Correo electrónico inválido.'];
if ($phone === null)    $errors[] = ['field' => 'phone',    'message' => 'Teléfono inválido.'];
if ($interest === null) $errors[] = ['field' => 'interest', 'message' => 'Área de interés inválida.'];
if ($message === null)  $errors[] = ['field' => 'message',  'message' => 'Mensaje inválido (máx. 2000 caracteres).'];

if ($errors) {
    send_json(400, ['error' => 'Datos inválidos.', 'details' => $errors]);
}

if ($interest === '') {
    $interest = 'Consulta General';
}

// ── PLANTILLA HTML ─────────────────────────────────────────────────────
$companyHtml = $company !== ''
    ? '<div style="font-size:13px;color:#6a8a72;margin-top:3px;">' . esc($company) . '</div>'
    : '';

$messageHtml = $message !== '' ? '
    <!-- MESSAGE -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;">
      <tr><td style="background:#fafcf8;border:1px solid #dce8d7;border-radius:10px;padding:20px 22px;">
        <div style="font-size:10px;font-weight:700;color:#5a8060;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">Mensaje</div>
        <div style="font-size:14px;color:#2a3c2e;line-height:1.75;">' . esc($message) . '</div>
      </td></tr>
    </table>' : '';

$bodyRow = '
  <!-- BODY -->
  <tr><td style="background:#ffffff;padding:36px;border:1px solid #d8e8d2;border-top:none;">

    <!-- SENDER HIGHLIGHT -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="background:#f2fbed;border-left:4px solid #3d9618;padding:14px 20px;border-radius:0 10px 10px 0;">
        <div style="font-size:10px;color:#5a8060;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Contacto</div>
        <div style="font-size:21px;font-weight:800;color:#1a2733;line-height:1.2;">' . esc($name) . '</div>
        ' . $companyHtml . '
      </td></tr>
    </table>

    <!-- INFO TABLE -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4ede0;border-radius:10px;border-spacing:0;overflow:hidden;">
      <tr style="background:#f8fcf6;">
        <td style="padding:11px 18px;font-size:11px;font-weight:700;color:#5a8060;letter-spacing:0.06em;text-transform:uppercase;width:110px;border-bottom:1px solid #e4ede0;">Email</td>
        <td style="padding:11px 18px;font-size:14px;border-bottom:1px solid #e4ede0;">
          <a href="mailto:' . esc($email) . '" style="color:#2d6e1a;font-weight:600;text-decoration:none;">' . esc($email) . '</a>
        </td>
      </tr>
      <tr>
        <td style="padding:11px 18px;font-size:11px;font-weight:700;color:#5a8060;letter-spacing:0.06em;text-transform:uppercase;width:110px;border-bottom:1px solid #e4ede0;">Tel&eacute;fono</td>
        <td style="padding:11px 18px;font-size:14px;color:#1a2733;border-bottom:1px solid #e4ede0;">' . esc($phone) . '</td>
      </tr>
      <tr style="background:#f8fcf6;">
        <td style="padding:11px 18px;font-size:11px;font-weight:700;color:#5a8060;letter-spacing:0.06em;text-transform:uppercase;width:110px;">&Aacute;rea de inter&eacute;s</td>
        <td style="padding:11px 18px;">
          <span style="display:inline-block;background:#e5f4df;color:#2d6e1a;font-size:12px;font-weight:700;padding:4px 14px;border-radius:20px;border:1px solid #bdddb4;">' . esc($interest) . '</span>
        </td>
      </tr>
    </table>
    ' . $messageHtml . '

    <!-- CTA BUTTON -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
      <tr><td align="center">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="background:#2d6e1a;border-radius:10px;box-shadow:0 4px 14px rgba(45,110,26,0.30);">
            <a href="mailto:' . esc($email) . '?subject=Re%3A%20Consulta%20Metexsab%20%E2%80%94%20' . rawurlencode($name) . '"
               style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:-0.01em;">
              Responder a ' . esc($name) . ' &rarr;
            </a>
          </td>
        </tr></table>
      </td></tr>
    </table>

  </td></tr>';

$html = email_wrap(email_header('&#9993; Nueva consulta') . $bodyRow . email_footer());

// ── ENVÍO ──────────────────────────────────────────────────────────────
$subject = 'Nueva consulta — ' . $name . ($interest !== '' ? ' · ' . $interest : '');

if (send_email($subject, $html, $email)) {
    error_log('[Contacto] Email enviado: ' . $name . ' — ' . $interest);
    send_json(200, ['status' => 'ok', 'message' => '¡Consulta recibida! Nos pondremos en contacto contigo muy pronto.']);
}

error_log('[Contacto] Error al enviar email (mail() devolvió false)');
send_json(500, ['error' => 'Error al enviar la consulta. Por favor intenta de nuevo.']);

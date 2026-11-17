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

// ── PLANTILLA HTML (vive en _lib.php: contact_email_html) ──────────────
$html = contact_email_html($name, $email, $phone, $company, $interest, $message);

// ── ENVÍO ──────────────────────────────────────────────────────────────
$subject = 'Nueva consulta — ' . $name . ($interest !== '' ? ' · ' . $interest : '');

if (send_email($subject, $html, $email)) {
    error_log('[Contacto] Email enviado: ' . $name . ' — ' . $interest);
    send_json(200, ['status' => 'ok', 'message' => '¡Consulta recibida! Nos pondremos en contacto contigo muy pronto.']);
}

error_log('[Contacto] Error al enviar email (mail() devolvió false)');
send_json(500, ['error' => 'Error al enviar la consulta. Por favor intenta de nuevo.']);

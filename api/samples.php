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
$company = clean_str($body['company'] ?? null, 150, 2);
$email   = valid_email($body['email'] ?? null);
$phone   = valid_phone($body['phone'] ?? null);
$address = clean_str($body['address'] ?? null, 300, 8);
$notes   = clean_str($body['notes'] ?? '', 1000);

$errors = [];
if ($name === null)    $errors[] = ['field' => 'name',    'message' => 'Nombre inválido (2–100 caracteres).'];
if ($company === null) $errors[] = ['field' => 'company', 'message' => 'Nombre de la empresa inválido (2–150 caracteres).'];
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

// ── PLANTILLA HTML (vive en _lib.php: samples_email_html) ──────────────
$count = count($products);
$plural = $count !== 1 ? 's' : '';
$html = samples_email_html($name, $company, $email, $phone, $address, $notes, $products);

// ── ENVÍO ──────────────────────────────────────────────────────────────
$subject = "Solicitud de muestras — $name ($count producto$plural)";

if (send_email($subject, $html, $email)) {
    error_log("[Muestras] Email enviado: $name — $count producto(s)");
    send_json(200, ['status' => 'ok', 'message' => '¡Solicitud recibida! Nos pondremos en contacto pronto.']);
}

error_log('[Muestras] Error al enviar email (mail() devolvió false)');
send_json(500, ['error' => 'Error al enviar la solicitud. Por favor intenta de nuevo.']);

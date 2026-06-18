# Metexsab API — versión PHP (para Neubox)

Reemplazo del backend Express (`server/`) para hosting compartido sin Node.js.
Misma funcionalidad: validación, honeypot, Cloudflare Turnstile, rate limiting
por IP y correos HTML idénticos.

## Endpoints

| Endpoint | Archivo | Límite por IP |
|---|---|---|
| `POST /api/contact` | `contact.php` | 10 / hora |
| `POST /api/samples` | `samples.php` | 8 / hora |

El `.htaccess` de esta carpeta mapea `/api/contact` → `contact.php`, así el
frontend no cambia (sigue llamando `fetch('/api/contact')`).

## Despliegue en Neubox

1. Sube **toda esta carpeta** como `public_html/api/` (junto al build de `frontend/dist/`).
2. Copia `config.php.example` → `config.php` y rellena:
   - `NOTIFY_EMAIL` — a dónde llegan las notificaciones.
   - `FROM_EMAIL` — crea esa cuenta en cPanel → *Email Accounts* (mejor entregabilidad).
   - `TURNSTILE_SECRET` — la Secret Key de Cloudflare Turnstile.
   - `ALLOWED_ORIGIN` — el dominio real del sitio.
3. Verifica que PHP ≥ 7.4 esté activo (cPanel → *Select PHP Version*; ideal 8.x).
4. Prueba el formulario de contacto y el de muestras desde el sitio.

## Notas

- El correo sale con `mail()` de PHP (el MTA del propio cPanel). Si los correos
  caen en spam, migrar a PHPMailer con SMTP autenticado de la cuenta `FROM_EMAIL`.
- El rate limiting guarda archivos en `api/.ratelimit/` (se crea solo, está
  bloqueado por `.htaccess`).
- `config.php` está bloqueado por `.htaccess` y **no** debe subirse a git
  (ver `.gitignore`).
- El backend Express en `server/` queda como implementación de desarrollo/referencia.

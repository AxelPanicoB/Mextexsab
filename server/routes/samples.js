import { Router } from 'express';
import nodemailer from 'nodemailer';
import { samplesLimiter } from '../middleware/rateLimiter.js';
import { validate, samplesSchema } from '../middleware/validate.js';
import { honeypotMiddleware } from '../middleware/honeypot.js';
import { turnstileMiddleware } from '../middleware/turnstile.js';

const esc = (str) =>
  String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function buildEmailHTML(data) {
  const productRows = data.products.map((p, i) => `
    <tr style="${i % 2 === 0 ? 'background:#f8fcf6;' : ''}">
      <td style="padding:12px 18px;border-bottom:1px solid #e4ede0;vertical-align:top;">
        <div style="font-size:14px;font-weight:700;color:#1a2733;">${esc(p.name)}</div>
        ${p.sku ? `<div style="font-size:11px;color:#8aaa88;margin-top:2px;">SKU: ${esc(p.sku)}</div>` : ''}
        ${p.selectedFlavors?.length ? `
        <div style="margin-top:6px;">
          ${p.selectedFlavors.map(f => `<span style="display:inline-block;background:#e5f4df;color:#2d6e1a;font-size:11px;font-weight:600;padding:2px 10px;border-radius:12px;border:1px solid #bdddb4;margin:2px 3px 2px 0;">${esc(f)}</span>`).join('')}
        </div>` : ''}
      </td>
    </tr>`).join('');

  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef4eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef4eb;padding:32px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

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
            <span style="font-size:10px;font-weight:700;color:#fff;letter-spacing:0.08em;text-transform:uppercase;">&#9879; Solicitud de muestras</span>
          </td>
        </tr></table>
      </td>
    </tr></table>
  </td></tr>

  <!-- ACCENT LINE -->
  <tr><td style="background:#5cb845;height:3px;"></td></tr>

  <!-- BODY -->
  <tr><td style="background:#ffffff;padding:36px;border:1px solid #d8e8d2;border-top:none;">

    <!-- SENDER HIGHLIGHT -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="background:#f2fbed;border-left:4px solid #3d9618;padding:14px 20px;border-radius:0 10px 10px 0;">
        <div style="font-size:10px;color:#5a8060;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Solicitante</div>
        <div style="font-size:21px;font-weight:800;color:#1a2733;line-height:1.2;">${esc(data.name)}</div>
        <table cellpadding="0" cellspacing="0" style="margin-top:6px;"><tr>
          <td style="padding-right:16px;font-size:13px;color:#5a7a60;">
            <a href="mailto:${esc(data.email)}" style="color:#2d6e1a;text-decoration:none;font-weight:600;">${esc(data.email)}</a>
          </td>
          <td style="font-size:13px;color:#5a7a60;">${esc(data.phone)}</td>
        </tr></table>
      </td></tr>
    </table>

    <!-- PRODUCTS SECTION -->
    <div style="font-size:11px;font-weight:700;color:#5a8060;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">
      Productos solicitados &nbsp;
      <span style="background:#e5f4df;color:#2d6e1a;padding:2px 10px;border-radius:12px;font-size:10px;">${data.products.length} producto${data.products.length !== 1 ? 's' : ''}</span>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4ede0;border-radius:10px;border-spacing:0;overflow:hidden;">
      ${productRows}
    </table>

    ${data.notes ? `
    <!-- NOTES -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;">
      <tr><td style="background:#fafcf8;border:1px solid #dce8d7;border-radius:10px;padding:20px 22px;">
        <div style="font-size:10px;font-weight:700;color:#5a8060;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px;">Notas adicionales</div>
        <div style="font-size:14px;color:#2a3c2e;line-height:1.75;">${esc(data.notes)}</div>
      </td></tr>
    </table>` : ''}

    <!-- CTA BUTTON -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
      <tr><td align="center">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="background:#2d6e1a;border-radius:10px;box-shadow:0 4px 14px rgba(45,110,26,0.30);">
            <a href="mailto:${esc(data.email)}?subject=Re%3A%20Solicitud%20de%20muestras%20%E2%80%94%20${encodeURIComponent(data.name)}"
               style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:-0.01em;">
              Contactar a ${esc(data.name)} &rarr;
            </a>
          </td>
        </tr></table>
      </td></tr>
    </table>

  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#f0f7ed;border:1px solid #d8e8d2;border-top:none;border-radius:0 0 14px 14px;padding:16px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="font-size:12px;color:#6a8f66;">
        &#128205; Quer&eacute;taro, M&eacute;xico &nbsp;&middot;&nbsp; &#128222; 442 218-0650 &nbsp;&middot;&nbsp; ventas@metexsab.com
      </td>
      <td align="right" style="font-size:11px;color:#99b595;white-space:nowrap;">metexsab.com</td>
    </tr></table>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

const router = Router();

router.post('/', samplesLimiter, honeypotMiddleware, turnstileMiddleware, validate(samplesSchema), async (req, res) => {
  const data = req.validated;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[Muestras] SMTP no configurado — revisa las variables de entorno.');
    return res.status(503).json({ error: 'El servicio de correo no está configurado.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Metexsab Web" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL || 'ventas@metexsab.com',
      replyTo: data.email,
      subject: `Solicitud de muestras — ${data.name} (${data.products.length} producto${data.products.length !== 1 ? 's' : ''})`,
      html: buildEmailHTML(data),
    });
    console.log(`[Muestras] Email enviado: ${data.name} — ${data.products.length} producto(s)`);
    return res.json({ status: 'ok', message: '¡Solicitud recibida! Nos pondremos en contacto pronto.' });
  } catch (err) {
    console.error('[Muestras] Error al enviar email:', err.message);
    return res.status(500).json({ error: 'Error al enviar la solicitud. Por favor intenta de nuevo.' });
  }
});

export default router;

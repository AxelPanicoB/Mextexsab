import { Router } from 'express';
import nodemailer from 'nodemailer';
import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXCEL_PATH = join(__dirname, '..', '..', 'Muestras_Metexsab.xlsx');
const SHEET_NAME = 'Solicitudes';
const HEADERS = ['Fecha y Hora', 'Nombre', 'Email', 'Teléfono', 'Productos', 'Notas'];

async function appendSample(data) {
  const wb = new ExcelJS.Workbook();
  try {
    await wb.xlsx.readFile(EXCEL_PATH);
  } catch {
    const ws = wb.addWorksheet(SHEET_NAME);
    const headerRow = ws.addRow(HEADERS);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF5CB845' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = { bottom: { style: 'thin', color: { argb: 'FF3A8A2A' } } };
    });
    ws.columns = [
      { width: 22 }, { width: 28 }, { width: 32 },
      { width: 18 }, { width: 65 }, { width: 45 },
    ];
  }

  let ws = wb.getWorksheet(SHEET_NAME);
  if (!ws) { ws = wb.addWorksheet(SHEET_NAME); ws.addRow(HEADERS); }

  const productsText = data.products
    .map((p) => p.selectedFlavors?.length
      ? `${p.name} (${p.selectedFlavors.join(', ')})`
      : p.name)
    .join(' | ');

  const row = ws.addRow([
    new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
    data.name, data.email, data.phone, productsText, data.notes || '',
  ]);

  const isEven = row.number % 2 === 0;
  row.eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isEven ? 'FFF0F7EE' : 'FFFFFFFF' } };
    cell.alignment = { vertical: 'middle', wrapText: true };
  });

  await wb.xlsx.writeFile(EXCEL_PATH);
}

function buildEmailHTML(data) {
  const productsList = data.products
    .map((p) => `<li><strong>${p.name}</strong>${p.selectedFlavors?.length ? ` — Perfiles: ${p.selectedFlavors.join(', ')}` : ''}</li>`)
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a2733;">
      <div style="background:#2a6b10;padding:20px 28px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:1.25rem;">Nueva solicitud de muestras</h2>
        <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:0.88rem;">Metexsab — sitio web</p>
      </div>
      <div style="background:#fff;padding:24px 28px;border:1px solid #dde8db;border-top:none;">
        <table style="width:100%;border-collapse:collapse;font-size:0.92rem;line-height:1.7;">
          <tr><td style="width:130px;color:#5a7066;padding:4px 0;"><strong>Nombre</strong></td><td>${data.name}</td></tr>
          <tr><td style="color:#5a7066;padding:4px 0;"><strong>Email</strong></td><td><a href="mailto:${data.email}" style="color:#2a6b10;">${data.email}</a></td></tr>
          <tr><td style="color:#5a7066;padding:4px 0;"><strong>Teléfono</strong></td><td>${data.phone}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5ece3;margin:16px 0;">
        <p style="font-weight:700;margin:0 0 8px;font-size:0.92rem;">Productos solicitados:</p>
        <ul style="padding-left:20px;margin:0;line-height:2;">${productsList}</ul>
        ${data.notes ? `<hr style="border:none;border-top:1px solid #e5ece3;margin:16px 0;"><p style="font-weight:700;margin:0 0 6px;font-size:0.92rem;">Notas:</p><p style="margin:0;color:#263648;">${data.notes}</p>` : ''}
      </div>
      <div style="background:#f4f9f2;padding:12px 28px;border:1px solid #dde8db;border-top:none;border-radius:0 0 8px 8px;">
        <p style="color:#6b8f67;font-size:0.78rem;margin:0;">Generado automáticamente desde metexsab.com</p>
      </div>
    </div>`;
}

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, phone, products, notes } = req.body;

  if (!name || !email || !phone || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'Faltan datos obligatorios.' });
  }

  const data = { name, email, phone, products, notes: notes || '' };

  try {
    await appendSample(data);
    console.log(`[Muestras] Solicitud guardada: ${name} <${email}> — ${products.length} producto(s)`);
  } catch (err) {
    console.error('[Muestras] Error al guardar en Excel:', err.message);
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"Metexsab Web" <${process.env.SMTP_USER}>`,
        to: 'ventas@metexsab.com',
        replyTo: email,
        subject: `Solicitud de muestras — ${name}`,
        html: buildEmailHTML(data),
      });
      console.log(`[Muestras] Email enviado a ventas@metexsab.com`);
    } catch (err) {
      console.error('[Muestras] Error al enviar email:', err.message);
    }
  }

  return res.json({ status: 'ok', message: '¡Solicitud recibida! Nos pondremos en contacto pronto.' });
});

export default router;

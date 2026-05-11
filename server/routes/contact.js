import { Router } from 'express';
import ExcelJS from 'exceljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Guarda el archivo en la raíz del proyecto → OneDrive lo sincroniza automáticamente
const EXCEL_PATH = join(__dirname, '..', '..', 'Contactos_Metexsab.xlsx');

const SHEET_NAME = 'Contactos';
const HEADERS = ['Fecha y Hora', 'Nombre', 'Empresa', 'Email', 'Teléfono', 'Interés', 'Mensaje'];

async function appendContact(data) {
  const wb = new ExcelJS.Workbook();

  try {
    await wb.xlsx.readFile(EXCEL_PATH);
  } catch {
    // El archivo no existe, lo creamos con encabezados formateados
    const ws = wb.addWorksheet(SHEET_NAME);
    const headerRow = ws.addRow(HEADERS);

    // Estilo de encabezados: fondo verde de marca, texto blanco, negrita
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF5CB845' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        bottom: { style: 'thin', color: { argb: 'FF3A8A2A' } }
      };
    });

    ws.columns = [
      { width: 22 }, // Fecha y Hora
      { width: 26 }, // Nombre
      { width: 28 }, // Empresa
      { width: 32 }, // Email
      { width: 18 }, // Teléfono
      { width: 22 }, // Interés
      { width: 55 }  // Mensaje
    ];
  }

  let ws = wb.getWorksheet(SHEET_NAME);
  if (!ws) {
    ws = wb.addWorksheet(SHEET_NAME);
    ws.addRow(HEADERS);
  }

  const row = ws.addRow([
    new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
    data.name,
    data.company || '',
    data.email,
    data.phone,
    data.interest || 'Consulta General',
    data.message || ''
  ]);

  // Estilo alternado para filas de datos
  const isEven = row.number % 2 === 0;
  row.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: isEven ? 'FFF0F7EE' : 'FFFFFFFF' }
    };
    cell.alignment = { vertical: 'middle', wrapText: true };
  });

  await wb.xlsx.writeFile(EXCEL_PATH);
}

const router = Router();

router.post('/', async (req, res) => {
  const { name, company, email, phone, interest, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Faltan datos obligatorios (nombre, email y teléfono).' });
  }

  try {
    await appendContact({ name, company, email, phone, interest, message });
    console.log(`[Contacto] Nueva consulta guardada: ${name} <${email}> — ${interest}`);
    return res.json({
      status: 'ok',
      message: '¡Consulta recibida! Nos pondremos en contacto contigo muy pronto.'
    });
  } catch (err) {
    console.error('[Contacto] Error al guardar en Excel:', err.message);
    return res.status(500).json({ error: 'Error interno al guardar la consulta. Por favor intenta de nuevo.' });
  }
});

export default router;

export function honeypotMiddleware(req, res, next) {
  if (req.body?.website) {
    // Bot filled the trap field — fake success so it doesn't retry
    console.warn('[Honeypot] Spam bloqueado:', req.ip);
    return res.json({ status: 'ok', message: 'Enviado correctamente.' });
  }
  next();
}

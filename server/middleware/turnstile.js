export async function turnstileMiddleware(req, res, next) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return next(); // not configured, skip

  const token = req.body?.turnstileToken;
  if (!token) {
    return res.status(400).json({ error: 'Verificación de seguridad requerida.' });
  }

  try {
    const params = new URLSearchParams({
      secret,
      response: token,
      remoteip: req.ip || '',
    });
    const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = await resp.json();
    if (!data.success) {
      return res.status(403).json({ error: 'Verificación de seguridad fallida. Intenta de nuevo.' });
    }
    next();
  } catch (err) {
    console.error('[Turnstile] Error al verificar:', err.message);
    next(); // don't block on Cloudflare API errors
  }
}

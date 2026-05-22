import rateLimit from 'express-rate-limit';

const limitMessage = (msg) => ({
  handler: (_req, res) => res.status(429).json({ error: msg }),
});

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  ...limitMessage('Demasiadas solicitudes. Intenta de nuevo en 15 minutos.'),
});

export const samplesLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  ...limitMessage('Has excedido el límite de solicitudes de muestras. Intenta en una hora.'),
});

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  ...limitMessage('Has excedido el límite de consultas. Intenta en una hora.'),
});

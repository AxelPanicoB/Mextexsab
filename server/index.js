// Load .env if present (Node 20.12+). Scripts don't pass --env-file,
// so without this the SMTP/Turnstile/CORS vars are never read.
try { process.loadEnvFile(); } catch { /* .env is optional in dev */ }

import express from 'express';
import cors from 'cors';
import { helmetMiddleware } from './middleware/security.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import productsRouter from './routes/products.js';
import contactRouter from './routes/contact.js';
import samplesRouter from './routes/samples.js';

const app = express();
const PORT = process.env.PORT || 4000;
const isDev = process.env.NODE_ENV !== 'production';

// ── CORS ──────────────────────────────────────────────────────────────
// Set ALLOWED_ORIGIN in .env for production (comma-separated if multiple)
const devOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];
const prodOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(',').map((o) => o.trim())
  : [];
const allowedOrigins = isDev ? devOrigins : prodOrigins;

// ── SECURITY MIDDLEWARE ────────────────────────────────────────────────
app.use(helmetMiddleware);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    const err = new Error('CORS: origin not allowed');
    err.status = 403;
    cb(err);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '10kb' }));
app.use(generalLimiter);

// ── ROUTES ─────────────────────────────────────────────────────────────
// Prevent search engines from indexing API endpoints
app.use('/api', (_req, res, next) => {
  res.set('X-Robots-Tag', 'noindex, nofollow');
  next();
});
app.use('/api/products', productsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/samples', samplesRouter);

app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

// ── GLOBAL ERROR HANDLER ───────────────────────────────────────────────
// Never expose stack traces in production
app.use((err, _req, res, _next) => {
  console.error('[Error]', err.message);
  res.status(err.status || 500).json({
    error: isDev ? err.message : 'Error interno del servidor.',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend iniciado en http://localhost:${PORT}`);
});

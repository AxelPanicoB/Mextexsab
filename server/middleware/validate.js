import { z } from 'zod';

// Strip < > to prevent basic HTML injection in stored/emailed data.
// Zod 4: string checks (.min/.max/.regex) must come BEFORE .transform()
const safeStr = (max, min = 0) =>
  z.string().trim().min(min).max(max).transform((s) => s.replace(/[<>]/g, ''));

const phoneStr = z
  .string()
  .trim()
  .min(7)
  .max(20)
  .regex(/^[\d\s\+\-\(\)]+$/, 'Teléfono inválido');

export const samplesSchema = z.object({
  name:     safeStr(100, 2),
  email:    z.string().trim().email().max(200),
  phone:    phoneStr,
  address:  safeStr(300, 8),
  notes:    safeStr(1000).optional().default(''),
  products: z
    .array(
      z.object({
        id:             safeStr(100),
        name:           safeStr(200),
        sku:            safeStr(100).nullable().optional(),
        selectedFlavors: z.array(safeStr(100)).max(20).optional().default([]),
      })
    )
    .min(1)
    .max(20),
});

export const contactSchema = z.object({
  name:     safeStr(100, 2),
  company:  safeStr(100).optional().default(''),
  email:    z.string().trim().email().max(200),
  phone:    phoneStr,
  interest: safeStr(200).optional().default('Consulta General'),
  message:  safeStr(2000).optional().default(''),
});

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos.',
        details: result.error.issues.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    req.validated = result.data;
    next();
  };
}

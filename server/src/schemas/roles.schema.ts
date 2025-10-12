import { z } from 'zod';

export const createRolSchema = z.object({
  rol: z
    .string()
    .min(1)
    .regex(/^[a-z]+$/, 'Solo letras minúsculas'),
  title: z
    .string()
    .min(1)
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      'Solo letras mayúsculas, minúsculas, acentos y espacios',
    ),
});

export type CreateRolBody = z.infer<typeof createRolSchema>;

export const updateRolSchema = createRolSchema.extend({
  id: z.number().int().positive(),
});

export type UpdateRolBody = z.infer<typeof updateRolSchema>;

import { z } from 'zod';

export const newUserSchema = z.object({
  fullname: z.string().min(8),
  username: z.string().min(4),
  password: z.string().min(8),
});

export type NewUserBody = z.infer<typeof newUserSchema>;

import { z } from 'zod';

export const loginValidationSchema = z
  .object({
    phone: z.string().optional(),
    email: z.string().email('Invalid email').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.phone || data.email, {
    message: 'Either email or phone number must be provided.',
  });

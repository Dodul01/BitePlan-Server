import { z } from 'zod';

const orderValidationSchema = z.object({
  orderedItemIds: z.array(z.string().min(1)),
});

export const orderValidation = {
  orderValidationSchema,
};

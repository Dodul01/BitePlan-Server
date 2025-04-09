// New zod code
import { z } from 'zod';

export const orderValidationSchema = z.object({
  orderedItemIds: z.array(
    z.object({
      meal: z.object({
        _id: z.string(),
        name: z.string(),
        description: z.string(),
        image: z.string().url(),
        prepTime: z.string(),
        price: z.number(),
        servings: z.number(),
        rating: z.number(),
        busisnessName: z.string(),
        cuisine: z.string(),
        cuisineOptions: z.string(),
        dietaryInfo: z.array(z.string()),
        dietaryOptions: z.string(),
        tags: z.array(z.string()),
        createdAt: z.string(), // or z.coerce.date() if you want
        updatedAt: z.string(),
        __v: z.number(),
      }),
      customization: z.string().min(1),
      schedule: z.string().min(1),
    }),
  ),

  user: z.object({
    _id: z.string(),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10),
    role: z.string(),
    busisnessName: z.string().optional(),
    cuisineSepcialties: z.string().optional(),
    deliveryAddress: z.string().min(1),
    iat: z.number(),
    exp: z.number(),
  }),

  paymentMethod: z
    .object({
      id: z.string(),
      type: z.string(),
      card: z
        .object({
          brand: z.string(),
          display_brand: z.string(),
          country: z.string(),
          exp_month: z.number().min(1).max(12),
          exp_year: z.number().min(new Date().getFullYear()),
          funding: z.string(),
          last4: z.string().length(4),
          regulated_status: z.string(),
          wallet: z.any().nullable().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const orderValidation = {
  orderValidationSchema,
};

// // Old Zod Code
// import { z } from 'zod';

// export const orderValidationSchema = z.object({
//   orderedItemIds: z.array(z.string().min(1)),

//   user: z.object({
//     _id: z.string(),
//     name: z.string().min(1),
//     email: z.string().email(),
//     phone: z.string().min(10),
//     role: z.string(),
//     busisnessName: z.string().optional(),
//     cuisineSepcialties: z.string().optional(),
//     deliveryAddress: z.string().min(1),
//     iat: z.number(),
//     exp: z.number(),
//   }),

//   paymentMethod: z
//     .object({
//       id: z.string(),
//       type: z.string(),
//       card: z
//         .object({
//           brand: z.string(),
//           display_brand: z.string(),
//           country: z.string(),
//           exp_month: z.number().min(1).max(12),
//           exp_year: z.number().min(new Date().getFullYear()),
//           funding: z.string(),
//           last4: z.string().length(4),
//           regulated_status: z.string(),
//           wallet: z.any().nullable().optional(),
//         })
//         .optional(),
//     })
//     .optional(),
// });

// export const orderValidation = {
//   orderValidationSchema,
// };

import { z } from "zod";
import { DietaryOptions, CuisineOptions } from "./meal.interface";

export const DietaryOptionsEnum = z.nativeEnum(DietaryOptions);
export const CuisineOptionsEnum = z.nativeEnum(CuisineOptions);

export const mealValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required.",
  }),
  description: z.string({
    required_error: "Description is required.",
  }),
  image: z
    .string({
      required_error: "Image URL is required.",
    })
    .url("Image must be a valid URL."),
  prepTime: z.string({
    required_error: "Preparation time is required.",
  }),
  servings: z.number({
    required_error: "Servings is required.",
  }),
  tags: z.array(z.string()),
  dietaryInfo: z.array(z.string()),
  cuisine: CuisineOptionsEnum,
  rating: z.number({
    required_error: "Rating is required.",
  }),
  dietaryOptions: DietaryOptionsEnum,
  cuisineOptions: CuisineOptionsEnum,
});

export const mealValidation = {
    mealValidationSchema,
  };
  
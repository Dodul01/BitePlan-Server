import mongoose, { Schema, Document } from 'mongoose';
import { DietaryOptions, CuisineOptions, IMeal } from './meal.interface';

export interface IMealDocument extends IMeal, Document {}

const mealSchema = new Schema<IMealDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    prepTime: { type: String, required: true },
    price: { type: Number, required: true },
    servings: { type: Number, required: true },
    tags: { type: [String], required: true },
    dietaryInfo: { type: [String], required: true },
    cuisine: {
      type: String,
      enum: Object.values(CuisineOptions),
      required: true,
    },
    rating: { type: Number, required: true },
    dietaryOptions: {
      type: String,
      enum: Object.values(DietaryOptions),
      required: true,
    },
    cuisineOptions: {
      type: String,
      enum: Object.values(CuisineOptions),
      required: true,
    },
  },
  { timestamps: true },
);

export const Meal = mongoose.model<IMealDocument>('Meal', mealSchema);

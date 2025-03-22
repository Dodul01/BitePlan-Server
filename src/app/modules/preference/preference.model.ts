import { model, Schema } from 'mongoose';
import {
  Allergy,
  Cuisine,
  DietaryType,
  TMealPreferences,
} from './preferences.interface';

const mealPreferencesSchema = new Schema<TMealPreferences>({
  allergies: {
    type: [String],
    enum: Object.values(Allergy),
    required: true,
  },
  dietaryTypes: {
    type: [String],
    enum: Object.values(DietaryType),
    required: true,
  },
  cuisines: {
    type: [String],
    enum: Object.values(Cuisine),
    required: true,
  },
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium-mild', 'medium', 'medium-hot', 'hot'],
    required: true,
  },
  portionSize: {
    type: String,
    enum: ['small', 'regular', 'large'],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const MealPreferences = model<TMealPreferences>(
  'MealPreference',
  mealPreferencesSchema,
);

export default MealPreferences;

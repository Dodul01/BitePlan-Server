import { IMeal } from './meal.interface';
import { Meal } from './meal.model';

const createMealIntoDB = async (meal: IMeal) => {
  const result = await Meal.create(meal);
  return result;
};

export const MealService = {
  createMealIntoDB,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMeal } from './meal.interface';
import { Meal } from './meal.model';

const createMealIntoDB = async (meal: IMeal) => {
  const result = await Meal.create(meal);
  return result;
};

const getMealFromDB = async () => {
  const result = await Meal.find();
  return result;
};

const updateMealFromDB = async (id: string, data: any) => {
  const result = await Meal.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true },
  );

  return result;
};

export const MealService = {
  createMealIntoDB,
  getMealFromDB,
  updateMealFromDB,
};

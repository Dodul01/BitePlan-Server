import { Request, Response } from 'express';

import { MealService } from './meal.service';
import { mealValidation } from './meal.validation';

const createMeal = async (req: Request, res: Response) => {
  try {
    const meal = req.body;
    const zodPerseMeal = mealValidation.mealValidationSchema.parse(meal);
    const result = await MealService.createMealIntoDB(zodPerseMeal);

    res.status(200).send({
      success: true,
      message: 'Meal created successfully.',
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      statusCode: 400,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

export const MealControllers = {
    createMeal
}
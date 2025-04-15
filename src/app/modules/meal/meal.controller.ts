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

const getMeals = async (req: Request, res: Response) => {
  try {
    const result = await MealService.getMealFromDB();

    res.status(200).send({
      status: true,
      message: 'Meal retrieved successfully',
      data: result,
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

const updateMeal = async (req: Request, res: Response) => {
  console.log('id', req.params.id);
  console.log(req.body);
  try {

    const id = req.params.id;
    const data = req.body;
    const result = await MealService.updateMealFromDB(id, data);

    res.send({
      status: true,
      message: 'Meal updated successfully.',
      data: result,
    });
  } catch (error) {
    res.send({
      status: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

export const MealControllers = {
  createMeal,
  getMeals,
  updateMeal,
};

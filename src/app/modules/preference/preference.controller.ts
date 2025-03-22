import { Request, Response } from 'express';
import { MealPreferenceService } from './preference.service';

const createPreference = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await MealPreferenceService.createPreferenceIntoDB(payload);

    res.status(200).send({
      success: true,
      message: 'Meal Preference created successfully.',
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

const getPreference = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const result = await MealPreferenceService.getPreferenceFromDB(email);

    res.status(200).send({
      success: true,
      message: 'Meal Preference retrive successfully.',
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

const updateMealPreference = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const data = req.body;
    const result = await MealPreferenceService.updatePreferenceFromDB(
      email,
      data,
    );

    res.status(200).send({
      success: true,
      message: 'Meal Preference updated successfully.',
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

export const MealPreferenceController = {
  createPreference,
  getPreference,
  updateMealPreference,
};

import express from 'express';
import { MealControllers } from './meal.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/create-meal', auth('seller'), MealControllers.createMeal);

export const MealRouter = router;

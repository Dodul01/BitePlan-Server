import express from 'express';
import { MealControllers } from './meal.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/create-meal', auth('seller'), MealControllers.createMeal);
router.get('/meals', MealControllers.getMeals);
router.put('/update-meal/:id', auth('seller'), MealControllers.updateMeal);

export const MealRouter = router;

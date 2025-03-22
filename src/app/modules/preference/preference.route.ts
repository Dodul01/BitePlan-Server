import express from 'express';
import { MealPreferenceController } from './preference.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/create-preference', MealPreferenceController.createPreference);
router.get(
  '/get-preference/:email',
  auth('customer', 'seller'),
  MealPreferenceController.getPreference,
);
router.put(
  '/update-preference/:email',
  auth('customer'),
  MealPreferenceController.updateMealPreference,
);

export const PreferenceRouter = router;

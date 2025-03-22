/* eslint-disable @typescript-eslint/no-explicit-any */
import MealPreferences from './preference.model';
import { TMealPreferences } from './preferences.interface';

const createPreferenceIntoDB = async (payload: TMealPreferences) => {
  const result = await MealPreferences.create(payload);
  return result;
};

const getPreferenceFromDB = async (email: string) => {
  const preference = await MealPreferences.findOne({ email });
  return preference;
};

const updatePreferenceFromDB = async (email: string, data: any) => {
  const updatePreference = await MealPreferences.findOneAndUpdate(
    { email },
    { $set: data },
    { new: true },
  );

  return updatePreference;
};

export const MealPreferenceService = {
  createPreferenceIntoDB,
  getPreferenceFromDB,
  updatePreferenceFromDB,
};

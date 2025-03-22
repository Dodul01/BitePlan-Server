/* eslint-disable no-unused-vars */
export enum DietaryType {
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
  PESCATARIAN = 'pescatarian',
  KETO = 'keto',
  PALEO = 'paleo',
  GLUTEN_FREE = 'gluten-free',
}

export enum Cuisine {
  ITALIAN = 'italian',
  MEXICAN = 'mexican',
  JAPANESE = 'japanese',
  THAI = 'thai',
  INDIAN = 'indian',
  CHINESE = 'chinese',
  FRENCH = 'french',
  KOREAN = 'korean',
  VIETNAMESE = 'vietnamese',
  GREEK = 'greek',
  MEDITERRANEAN = 'mediterranean',
}

export enum Allergy {
  NUTS = 'nuts',
  DAIRY = 'dairy',
  EGGS = 'eggs',
  SHELLFISH = 'shellfish',
  SOY = 'soy',
  WHEAT = 'wheat',
  FISH = 'fish',
}

export type SpiceLevel =
  | 'mild'
  | 'medium-mild'
  | 'medium'
  | 'medium-hot'
  | 'hot';
export type PortionSize = 'small' | 'regular' | 'large';

export interface TMealPreferences {
  allergies: Allergy[];
  dietaryTypes: DietaryType[];
  cuisines: Cuisine[];
  spiceLevel: SpiceLevel;
  portionSize: PortionSize;
  email: string;
}

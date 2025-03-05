/* eslint-disable no-unused-vars */
export enum DietaryOptions {
  Vegetarian = 'Vegetarian',
  Vegan = 'Vegan',
  GlutenFree = 'Gluten-Free',
  DairyFree = 'Dairy-Free',
  Keto = 'Keto',
  Paleo = 'Paleo',
  LowCarb = 'Low Carb',
  HighProtein = 'High Protein',
}

export enum CuisineOptions {
  American = 'American',
  Italian = 'Italian',
  Mexican = 'Mexican',
  Indian = 'Indian',
  Mediterranean = 'Mediterranean',
  Asian = 'Asian',
  Fusion = 'Fusion',
  Thai = 'Thai',
}

export interface IMeal {
  name: string;
  description: string;
  image: string;
  prepTime: string;
  servings: number;
  tags: string[];
  dietaryInfo: string[];
  cuisine: CuisineOptions;
  rating: number;
  dietaryOptions: DietaryOptions;
  cuisineOptions: CuisineOptions;
}

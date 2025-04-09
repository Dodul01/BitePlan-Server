/* eslint-disable @typescript-eslint/no-explicit-any */

// New Order payload interface
export interface Meal {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  prepTime: string;
  servings: number;
  rating: number;
  cuisine: string;
  cuisineOptions: string;
  dietaryInfo: string[];
  dietaryOptions: string;
  tags: string[];
  busisnessName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderPayload {
  orderedItemIds: {
    meal: Meal;
    customization: string;
    schedule: string;
  }[];

  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    busisnessName?: string;
    cuisineSepcialties?: string;
    deliveryAddress: string;
    iat: number;
    exp: number;
  };

  paymentMethod?: {
    id: string;
    type: string;
    card?: {
      brand: string;
      display_brand: string;
      country: string;
      exp_month: number;
      exp_year: number;
      funding: string;
      last4: string;
      regulated_status: string;
      wallet?: any | null;
    };
  };
}

// Old Code
// /* eslint-disable @typescript-eslint/no-explicit-any */
// export interface OrderPayload {
//   orderedItemIds: string[];

//   user: {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
//     role: string;
//     busisnessName?: string;
//     cuisineSepcialties?: string;
//     deliveryAddress: string;
//     iat: number;
//     exp: number;
//   };

//   paymentMethod?: {
//     id: string;
//     type: string;

//     card?: {
//       brand: string;
//       display_brand: string;
//       country: string;
//       exp_month: number;
//       exp_year: number;
//       funding: string;
//       last4: string;
//       regulated_status: string;
//       wallet?: any | null;
//     };
//   };
// }

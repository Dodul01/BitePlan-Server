/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OrderPayload {
  orderedItemIds: string[];

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

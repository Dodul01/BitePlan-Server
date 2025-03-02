export interface TUser {
  name: string;
  email: string;
  phone: string;
  password: string | undefined;
  role: 'customer' | 'seller';
  busisnessName?: string;
  cuisineSepcialties?: string;
  deliveryAddress?: string;
  logoImage?: string;
}

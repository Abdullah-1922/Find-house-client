import { TUser } from '../user/user.type';

export interface TProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  rating: number;
  admin: TUser | string;
  review: any[];
  createdAt: string;
  updatedAt: string;
}

export interface TProductReview {
  _id: string;
  userId: TUser;
  product: string;
  rating: number;
  images: string[];
  review: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TProductPayment {
  _id: string;
  customerId: TUser;
  products: TProduct[];
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  address: string;
  zip: string;
  transactionId: string;
  status: string;
  gatewayName: string;
  currency: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

import { TUser } from '../user/user.type';

export interface TProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  rating: number;
  admin: TUser;
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

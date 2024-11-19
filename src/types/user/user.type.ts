import { TAuth } from '../auth/auth.type';

export interface TUser {
  _id: string;
  firstName: string;
  secondName: string;
  auth: TAuth;
  email?: string;
  image: string;
  role: string;
  paymentHistory: any[];
  property: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAuth } from '../auth/auth.type';

export interface TUser {
  _id: string;
  firstName: string;
  secondName: string;
  auth: TAuth;
  email?: string;
  image: string;
  phone?: string;
  location?: string;
  role: string;
  paymentHistory: any[];
  property: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

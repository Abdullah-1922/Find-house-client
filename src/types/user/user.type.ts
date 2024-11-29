import { TAuth } from '../auth/auth.type';

export type TSocialMediaLinks = {
  facebook?: string; // Optional fields for each social platform
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
};

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
  socialMediaLinks?: TSocialMediaLinks;
  __v: number;
}

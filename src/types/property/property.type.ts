import { TUser } from "../user/user.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PropertyStatus = "active" | "non-active";

export type PropertyCategory = "sell" | "rent";

export type PropertyType =
  | "house"
  | "commercial"
  | "apartment"
  | "lot"
  | "garage";

export type Features =
  | "Air Conditioning"
  | "Swimming Pool"
  | "Central Heating"
  | "Laundry Room"
  | "Gym"
  | "Alarm"
  | "Window Covering"
  | "Refrigerator"
  | "TV Cable & WIFI"
  | "Microwave";

export type ExtraInfoAge =
  | "0-1"
  | "0-5"
  | "0-10"
  | "0-15"
  | "0-20"
  | "0-50"
  | "50+";

export interface ILocation {
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
}

export interface IExtraInfo {
  age: ExtraInfoAge;
  rooms: number;
  bathrooms: number;
  _id: string;
}

export interface IContactInfo {
  name: string;
  userName: string;
  phone?: string;
  _id: string;
  email?: string;
}
type UserProperty = {
  _id: string;
  firstName: string;
  secondName: string;
  auth: string;
  email?: string;
  image: string;
  role: string;
  paymentHistory: any[];
  property: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TProperty = {
  _id: string;
  author: UserProperty;
  ownedBy: UserProperty;
  status: PropertyStatus;
  feedback: string[];
  comment: string[];
  title: string;
  description: string;
  category: PropertyCategory;
  type: PropertyType;
  rooms: number;
  video: string;
  images: string[];
  location: ILocation;
  extraInfo: IExtraInfo;
  features: Features[];
  contactInfo: IContactInfo;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
};

export type TSchedule = {
  _id: string;
  user: UserProperty;
  agent: UserProperty;
  property: TProperty;
  date: string;
  time: string;
  isAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  isApproved: boolean;
};

export type TRangeFilters = {
  minArea?: number;
  maxArea?: number;
  minPrice?: number;
  maxPrice?: number;
};

export type TPropertyPayment = {
  _id: string;
  property: TProperty;
  user: TUser;
  category: "sell" | "rent";
  paymentDate: Date;
  extraInfo?: string;
  totalPrice: number; // For Sell
  monthlyRent: number; // For Rent
  leaseDuration: number; // In months, for Rent
  paymentType: "full" | "installment";
  paymentStatus: "pending" | "completed" | "failed";
  updatedBy: TUser;
  gatewayName: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
};

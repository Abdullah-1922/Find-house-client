interface TAgent {
  name: string;
  image: string;
}

export interface TProperty {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  garages: number;
  status: 'For Sale' | 'For Rent';
  featured: boolean;
  agent: TAgent;
  postedTime: string;
  imageUrl: string;
}

export interface DecodedJWT {
  email: string;
  role: string;
  _id: string;
  socialId: string;
  iat: number;
  exp: number;
}

export * from './auth/auth.type';
export * from './user/user.type';

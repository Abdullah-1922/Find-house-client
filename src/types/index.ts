export interface DecodedJWT {
  email: string;
  role: string;
  _id: string;
  socialId: string;
  iat: number;
  exp: number;
}

export * from './property/property.type';
export * from './auth/auth.type';
export * from './user/user.type';
export * from './blog/blog.type';

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
export * from './clogComment/blogComment.type';
export * from './products/product.type';
export * from './popularPlaces/popularPlaces.type';

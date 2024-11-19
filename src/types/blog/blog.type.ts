import { TUser } from "../user/user.type";

export type TBlog = {
  _id: string;
  userId: TUser ;
  category: string;
  image: string;
  title: string;
  description: string;
  lovedBy: TUser[] | string[];
  comment: TUser[] | string[];
  createdAt: string;
  updatedAt: string;
};


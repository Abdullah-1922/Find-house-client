import { TUser } from '../user/user.type';

export interface TBlogComment {
  _id: string;
  userId: TUser;
  blogId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

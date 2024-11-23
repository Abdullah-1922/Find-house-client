export interface TBlogComment {
  _id: string;
  userId: TUserId;
  blogId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface TUserId {
  _id: string;
  firstName: string;
  image: string;
}

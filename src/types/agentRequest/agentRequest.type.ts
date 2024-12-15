import { TUser } from "../user/user.type";

export type TAgentRequest = {
    _id: string; // ObjectId
    userId: TUser; 
    status: 'pending' | 'approved' | 'rejected'; // String
    createdAt: Date;
    updatedAt: Date;
    __v: number;
};
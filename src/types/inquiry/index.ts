import { TUser } from "../user/user.type"

export type TInquiry = {
  _id: string
  agent: TUser
  user: TUser
  fullName: string
  phone: string
  email: string
  message: string
  isApproved: boolean
  isAccepted: boolean
  createdAt: string
  updatedAt: string
}
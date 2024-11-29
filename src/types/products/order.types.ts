import { TUser } from "../user/user.type"
import { TProduct } from "./product.type"

export type TOrder = {
  _id: string
  customerId: TUser
  products: TProduct[]
  name: string
  email: string
  phone: string
  city: string
  state: string
  country: string
  address: string
  zip: string
  transactionId: string
  status: string
  gatewayName: string
  currency: string
  amount: number
  createdAt: string
  updatedAt: string
}
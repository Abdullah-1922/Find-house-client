import { cookies } from "next/headers";
import { decodeJWT } from "./verifyToken";

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedUser = null;
  if (accessToken) {
    decodedUser = decodeJWT(accessToken);
    return {
      _id: decodedUser!._id,
      email: decodedUser!.email,
      role: decodedUser!.role,
      socialId: decodedUser!.socialId,
    };
  }
  return decodedUser;
};
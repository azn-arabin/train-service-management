import { USER_TYPES } from "../constants/enumConstants";
import { Request } from "express";

export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];

export interface UserPayload {
  role: UserType;
  userId: string;
}

export interface AuthenticatedRequest extends Request {
  user: UserPayload;
}

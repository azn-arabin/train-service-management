import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { sendFailureResponse } from "../lib/helpers/responseHelper";
import { USER_TYPES } from "../lib/constants/enumConstants";
import { AuthenticatedRequest } from "../lib/types/types";

export const authorizationMiddleware = (
  allowedRoles = Object.values(USER_TYPES),
) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return sendFailureResponse({
        res,
        statusCode: 401,
        message: "Authorization header is missing",
      });
    }

    try {
      const token = authorization.replace("Bearer ", "");
      req.user = jwt.verify(token, process.env.JWT_SECRET as string) as any;

      if (!allowedRoles.includes(req.user.role)) {
        return sendFailureResponse({
          res,
          statusCode: 403,
          message: "You do not have permission to perform this action.",
        });
      }

      next();
    } catch (e) {
      sendFailureResponse({
        res,
        statusCode: 401,
        message: "Unauthenticated!",
      });
    }
  };
};

export const adminOnlyAuthorization = authorizationMiddleware([
  USER_TYPES.ADMIN,
]) as any;
export const userOnlyAuthorization = authorizationMiddleware([
  USER_TYPES.USER,
]) as any;

export const anyUserAuthorization = authorizationMiddleware() as any;

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../lib/helpers/responseHelper";
import { UserType } from "../lib/types/types";
import { removeSensitiveData } from "../lib/helpers/utilsHelper";

const signToken = (user: { _id: unknown; role: UserType }) => {
  const expiry = process.env.JWT_EXPIRY;
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: expiry },
  );
};

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return sendFailureResponse({
        res,
        statusCode: 409,
        message: "User already exists",
      });
    }

    user = new User({ fullName, email, password });
    user.save();
    const token = signToken(user);

    sendSuccessResponse({
      res,
      data: { token, user: removeSensitiveData(user) },
    });
  } catch (error) {
    sendFailureResponse({ res });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return sendFailureResponse({
        res,
        statusCode: 400,
        message: "Invalid credentials",
      });
    }
    const token = signToken(user);

    sendSuccessResponse({
      res,
      data: { token, user: removeSensitiveData(user) },
    });
  } catch (error) {
    sendFailureResponse({ res });
  }
};

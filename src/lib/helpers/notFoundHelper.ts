import createError from "http-errors";
import { Response, Request, NextFunction } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(createError(404, "Your requested url was not found!"));
};

export default notFoundHandler;

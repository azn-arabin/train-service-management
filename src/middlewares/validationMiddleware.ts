import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      status: "error",
      errors: mappedErrors,
    });
  }
};

export default validatorMiddleware;

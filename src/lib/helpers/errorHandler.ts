import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || 500).json({
    status: "error",
    errors: {
      common: {
        msg: err.message || "Internal Server Error",
      },
    },
  });
};

export default errorHandler;

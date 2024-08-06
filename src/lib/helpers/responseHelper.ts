import { Response } from "express";

interface SuccessResponse {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: any;
  meta?: {
    totalItems?: number;
    page?: number;
    pageSize?: number;
    totalPages?: number;
  };
}

interface FailureResponse {
  res: Response;
  statusCode?: number;
  message?: string;
}

interface FieldErrorResponse {
  res: Response;
  statusCode?: number;
  message?: string;
  field: string;
}

export const sendSuccessResponse = ({
  res,
  statusCode = 200,
  message = "Request processed successfully",
  data,
  meta,
}: SuccessResponse): void => {
  const response: any = {
    status: "success",
    message,
  };

  if (meta !== undefined) {
    response.meta = meta;
  }
  if (data !== undefined) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};

export const sendFailureResponse = ({
  res,
  statusCode = 500,
  message,
}: FailureResponse): void => {
  res.status(statusCode).json({
    status: "error",
    errors: {
      common: {
        msg: message || "Internal Server Error",
      },
    },
  });
};

export const sendFieldErrorResponse = ({
  res,
  statusCode = 409,
  message,
  field,
}: FieldErrorResponse): void => {
  res.status(statusCode).json({
    status: "error",
    errors: {
      [field]: {
        msg: message || "Internal Server Error",
        path: field,
      },
    },
  });
};

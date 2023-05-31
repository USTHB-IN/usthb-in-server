import { Request, Response, NextFunction } from "express";
import type { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error);
  console.error(error.stack);
  const statusCode = error ? error.statusCode : 500;
  const message =
    error.message || "Something went wrong. Please try again later.";

  if (statusCode === 401) {
    response.status(statusCode).json({
      status: "error",
      statusCode,
      message: "Unauthorized. Please log in to continue.",
    });
  } else if (statusCode === 403) {
    response.status(statusCode).json({
      status: "error",
      statusCode,
      message: "Forbidden. You do not have permission to perform this action.",
    });
  } else if (statusCode === 404) {
    response.status(statusCode).json({
      status: "error",
      statusCode,
      message: "Not Found.",
    });
  } else if (statusCode === 409) {
    response.status(statusCode).json({
      status: "error",
      statusCode,
      message: "Conflict. This resource already exists.",
    });
  } else if (statusCode === 422) {
    response.status(statusCode).json({
      status: "error",
      statusCode,
      message: "Unprocessable Entity. The request data is invalid.",
    });
  } else if (statusCode === 429) {
    response.status(statusCode).json({
      status: "error",
      statusCode,
      message: "Too Many Requests. Please try again later.",
    });
  } else if (statusCode === 500) {
    response.status(statusCode).json({
      status: "error",
      statusCode,
      message: "Internal Server Error. Please try again later.",
    });
  } else {
    response.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  }
};

export class HttpError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

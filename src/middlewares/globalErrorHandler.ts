import { ErrorRequestHandler } from "express";
import config from "../config";
import { handleMongooseValidationError } from "../errors/handleMongooseValidationError";

import { TErrorMessage } from "../interface/errorInterface";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { handleDuplicateError } from "../errors/handleDuplicateError";
import { handleMongooseCastError } from "../errors/handleMongooseCastError";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessage: TErrorMessage = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  if (err?.name === "ValidationError") {
    const result = handleMongooseValidationError(err);
    statusCode = result?.statusCode;
    message = result?.message;
    errorMessage = result?.errorMessage;
  } else if (err instanceof ZodError) {
    const result = handleZodError(err);
    statusCode = result?.statusCode;
    message = result?.message;
    errorMessage = result?.errorMessage;
  } else if (err?.code === 11000) {
    const result = handleDuplicateError(err);
    statusCode = result?.statusCode;
    message = result?.message;
    errorMessage = result?.errorMessage;
  } else if (err.name === "CastError") {
    const result = handleMongooseCastError(err);
    statusCode = result?.statusCode;
    message = result?.message;
    errorMessage = result?.errorMessage;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessage = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessage = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  res.json({
    success: false,
    statusCode: statusCode,
    message: message,
    errorMessage,
    // err, //! To see error in-detail
    stack: config.node_env === "development" ? err?.stack : null,
  });
  next(err);
  // next()
};

export default globalErrorHandler;

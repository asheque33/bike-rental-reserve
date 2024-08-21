import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Something went wrong";

  res.json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
  next();
};

export default globalErrorHandler;

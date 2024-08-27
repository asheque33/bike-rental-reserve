import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const statusCode = 404;
  const message = "Not Found";

  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
};

export default notFound;

import { Response } from "express";
import httpStatus from "http-status";

export const noDataFound = (res: Response, data: any[]) => {
  if (!data.length) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
    return true;
  }
  return false;
};

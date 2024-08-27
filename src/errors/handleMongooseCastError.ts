import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/errorInterface";

export const handleMongooseCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const extractedText = err?.message?.match(/"([^"]+)"/)[1];
  const errorMessage = [
    {
      path: err?.path,
      message: `${extractedText} is not a valid ID.`,
    },
  ];
  return {
    statusCode: 400,
    message: "Invalid ID",
    errorMessage,
  };
};

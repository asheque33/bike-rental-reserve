import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/errorInterface";

export const handleMongooseCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const match = err?.message?.match(/"([^"]+)"/);
  const extractedText = match ? match[1] : "_id";
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

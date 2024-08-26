import mongoose from "mongoose";
import {
  TErrorMessage,
  TGenericErrorResponse,
} from "../interface/errorInterface";

const statusCode = 400;
export const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorMessage: TErrorMessage = Object.values(err.errors).map(
    (value: mongoose.Error.CastError | mongoose.Error.ValidatorError) => ({
      path: value?.path,
      message: value?.message,
    })
  );
  return {
    statusCode,
    message: "Validation Error",
    errorMessage,
  };
};

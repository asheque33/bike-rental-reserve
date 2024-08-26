import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interface/errorInterface";

const statusCode = 400;
const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorMessage = err?.issues.map((issue: ZodIssue) => ({
    path: issue?.path[issue.path.length - 1],
    message: issue?.message,
  }));
  // ! for missing any required fields in 2nd layer[after including zod validation]
  return {
    statusCode,
    message: "Validation Error",
    errorMessage,
  };
};
export default handleZodError;

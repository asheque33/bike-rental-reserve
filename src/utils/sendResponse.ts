import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  token?: string;
  data: T;
};

// res=> kon response * data => ki data pathachchi[data ek ek time e ek ek ta ashte pare tai amra generic use korbo]
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    token: data?.token,
    data: data?.data,
  });
};

export default sendResponse;

import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const register = catchAsync(async (req, res) => {
  const result = await authServices.registerIntoDB(req.body);
  // ! manually remove password to the api response
  // await result.save();

  // const userObject = result.toObject();
  // delete userObject.password;
  // delete userObject.__v;
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
    // data: userObject,
  });
});
const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, userExisted } =
    await authServices.loginIntoDB(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });
  // const userResponseData = userExisted.toObject();
  // delete userResponseData.createdAt,
  //   delete userResponseData.updatedAt,
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    token: accessToken,
    data: userExisted,
  });
});
const getUserByAuthToken = catchAsync(async (req, res) => {
  const result = await authServices.getUserByAuthTokenFromBrowser();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: result,
  });
});
export const authController = {
  register,
  login,
  getUserByAuthToken,
};

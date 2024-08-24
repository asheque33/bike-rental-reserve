import config from "../../config";
import { isPasswordMatched } from "../../utils/isPasswordMatched";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import jwt from "jsonwebtoken";
import { ILoginUser } from "./auth.interface";

const registerIntoDB = async (payload: IUser) => {
  const userExisted = await User.findOne({ email: payload.email });
  if (userExisted) {
    throw new Error("User with this email already exists");
  }
  const result = await User.create(payload);

  return result;
};
const loginIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const userExisted = await User.findOne({ email: payload.email }).select(
    "+password"
  );

  if (!userExisted) {
    throw new Error("User not found");
  }
  const passwordMatched = await isPasswordMatched(
    payload.password,
    userExisted.password
  );
  if (!passwordMatched) {
    throw new Error("Password mismatch");
  }
  const jwtPayload = {
    email: userExisted.email,
    role: userExisted.role,
  };
  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_private_key as string,
    { expiresIn: config.jwt_access_key_expires_in }
  );
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_private_key as string,
    { expiresIn: config.jwt_refresh_key_expires_in }
  );

  return {
    accessToken,
    refreshToken,
    userExisted,
  };
};
const getUserByAuthTokenFromDB = () => {
  const result = User.find({});
  return result;
};
const updateProfileFromDB = (email: string, payload: Partial<IUser>) => {
  // logic to update profile
  const updateProfileDoc = {
    name: payload.name,
    phone: payload.phone,
  };
  const result = User.findOneAndUpdate({ email }, updateProfileDoc, {
    runValidators: true,
    new: true,
  }).select("-createdAt -updatedAt -__v");
  return result;
};
export const authServices = {
  registerIntoDB,
  loginIntoDB,
  getUserByAuthTokenFromDB,
  updateProfileFromDB,
};

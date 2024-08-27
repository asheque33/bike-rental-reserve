import config from "../config";
import AppError from "../errors/AppError";
import { TUser_Role, USER_ROLE } from "../modules/user/user.constants";
import { User } from "../modules/user/user.model";

import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...requiredRoles: TUser_Role[]) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      throw new AppError(401, "You have no access to this route.");
    }
    const decoded = jwt.verify(
      accessToken as string,
      config.jwt_access_private_key as string
    );
    const { email, role } = decoded as JwtPayload;
    if (!requiredRoles.includes(role)) {
      throw new Error("You are not authorized to access");
    }

    const user = await User.findOne({ email });
    if (!user || user?.role !== role) {
      throw new Error("You are not allowed to access this");
    }
    //! make global Request interface object in index.d.ts file
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;

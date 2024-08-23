import config from "../config";
import { USER_ROLE } from "../modules/user/user.constants";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      throw new Error("No accessToken provided");
    }
    jwt.verify(
      accessToken as string,
      config.jwt_access_private_key as string,
      function (error, decoded) {
        if (error) {
          next(error);
        } else {
          // req.user = decoded;
          const { email, role } = decoded as JwtPayload;
          if (!requiredRoles.includes(role)) {
            throw new Error("You are not authorized to access");
          }
          const user = User.findOne({ email });
          if (!user || user?.role !== role) {
            throw new Error("You are not allowed to access this");
          }
          req.user = user;
          next();
        }
      }
    );

    // next();
  });
};
export default auth;

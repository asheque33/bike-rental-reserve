import express from "express";
import { authController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();
router.post("/signup", authController.register);
router.post("/login", authController.login);
router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.user),
  authController.getUserByAuthToken
);
export const authRoutes = router;

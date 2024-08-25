import { Router } from "express";
import { rentalController } from "./rental.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  rentalController.createRental
);
router.get(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  rentalController.getAllRentals
);

export const rentalRoutes = router;

import { Router } from "express";
import { rentalController } from "./rental.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import validateRequest from "../../middlewares/validateRequest";
import { rentalValidation } from "./rental.validation";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(rentalValidation.createRentalValidation),
  rentalController.createRental
);
router.get(
  "/",
  auth(USER_ROLE.user, USER_ROLE.admin),
  rentalController.getAllRentals
);
router.put(
  "/:id/return",
  auth(USER_ROLE.admin),
  validateRequest(rentalValidation.updateRentalValidation),
  rentalController.updateRental
);

export const rentalRoutes = router;

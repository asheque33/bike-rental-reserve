import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";

import { bikeController } from "./bike.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BikeValidations } from "./bike.validation";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.admin),
  //   validateRequest(BikeValidations.createBikeValidations),
  bikeController.createBike
);
router.get("/", bikeController.getBikes);
export const bikeRoutes = router;
router.put("/:id", auth(USER_ROLE.admin), bikeController.updateBike);
router.delete("/:id", auth(USER_ROLE.admin), bikeController.deleteBike);

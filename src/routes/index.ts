import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { bikeRoutes } from "../modules/bike/bike.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { rentalRoutes } from "../modules/rental/rental.routes";

const router = Router();

export const moduleRoutes = [
  {
    path: "/auth",
    routeHandler: authRoutes,
  },
  {
    path: "/bikes",
    routeHandler: bikeRoutes,
  },
  {
    path: "/rentals",
    routeHandler: rentalRoutes,
  },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.routeHandler);
});
export default router;

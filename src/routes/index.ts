import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { bikeRoutes } from "../modules/bike/bike.routes";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router();

export const moduleRoutes = [
  {
    path: "/auth",
    routeHandler: authRoutes,
  },
  //   {
  //     path: "/users",
  //     routeHandler: userRoutes,
  //   },
  //   {
  //     path: "/bikes",
  //     routeHandler: bikeRoutes,
  //   },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.routeHandler);
});
export default router;

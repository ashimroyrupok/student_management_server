import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";

// import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/student",
    route: StudentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

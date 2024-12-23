import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/create", UserControllers.createUser);
router.post("/login", UserControllers.LoginUser);

export const userRoutes = router;

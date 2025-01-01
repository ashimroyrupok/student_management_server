import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/create", UserControllers.createUser);
router.post("/login", UserControllers.LoginUser);
router.get("/:id",UserControllers.getSingleUser);

export const userRoutes = router;

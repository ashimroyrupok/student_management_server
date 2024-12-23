import { Router } from "express";
import { studentController } from "./student.controller";

const router = Router();

router.post("/create", studentController.createTestUser);
router.post("/all", studentController.getAllStudent);
router.post("/:id", studentController.updateStudent);
router.post("/:id", studentController.deleteStudent);

export const TestRoutes = router;

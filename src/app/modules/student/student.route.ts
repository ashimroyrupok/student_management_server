import { Router } from "express";
import { studentController } from "./student.controller";
import multer from "multer";
import { uploadPDF } from "./student.upload";
import { ValidateRequest } from "../../middleware/validateRequest";
import { studentValidationSchemas } from "./student.validation";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/create", studentController.createTestUser);
router.get("/all", studentController.getAllStudent);
router.put("/update/:id", studentController.updateStudent);
router.delete("/delete/:id", studentController.deleteStudent);

router.post(
  "/upload",
  upload.single("file"),
  uploadPDF
);

export const StudentRoutes = router;

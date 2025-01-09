import { Router } from "express";
import { studentController } from "./student.controller";
import multer from "multer";
import { uploadPDF } from "./student.upload";
import { ValidateRequest } from "../../middleware/validateRequest";
import { studentValidationSchemas } from "./student.validation";
import auth from "../../middleware/auth.middleware";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.cwd() + "/uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });
// const upload = multer({ storage: storage });

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post("/create", auth(), studentController.createTestUser);
router.get("/all", auth(), studentController.getAllStudent);
router.patch("/update/:id", auth(), studentController.updateStudent);
router.delete("/delete/:id", auth(), studentController.deleteStudent);
router.delete(
  "/deleteMany/:userMail",
  auth(),
  studentController.deleteManyStudent
);

router.post("/upload", auth(), upload.single("file"), uploadPDF);

export const StudentRoutes = router;

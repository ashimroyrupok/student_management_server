import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { regex } from "./student.upload.utils";
import { studentValidationSchemas } from "./student.validation";
import { ZodError } from "zod";
import PdfParse from "pdf-parse";
import fs from "fs";

export const uploadPDF = catchAsync(async (req, res, next) => {
  try {
    if (!req.file || req.file.mimetype !== "application/pdf") {
      throw new AppError(400, "Only PDF files are allowed.");
    }

    const pdfBuffer = req.file.buffer; // Buffer from multer.memoryStorage
    const pdfData = await PdfParse(pdfBuffer);
    const text = pdfData.text;

    if (!regex || !text) {
      throw new AppError(400, "Invalid PDF data or regex pattern.");
    }

    const results = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      const rollNumber = match[1];
      const subjectCodes = match[2]
        .split(",")
        .map((code) => code.trim().replace(/\((T|P)\)/g, ""))
        .filter(Boolean);

      const student = {
        rollNumber,
        subjectCodes,
        regulationYear: req.body.regulationYear,
        semester: Number(req.body.semester),
        userMail: req.body.userMail,
      };

      // Validate using Zod
      try {
        studentValidationSchemas.uploadpdfValidationSchema.parse({
          body: student,
        });
        const result = new Student(student);
        await result.save();
        results.push(student);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Validation failed:", error.errors);
          throw new AppError(400, "Validation error.");
        } else {
          console.error("Unexpected error:", error);
          throw error;
        }
      }
    }

    if (results.length === 0) {
      throw new AppError(400, "No valid data found in the PDF.");
    }

    res.json({ results });
  } catch (error) {
    console.error("Error processing PDF:", error);
    next(error);
  }
});

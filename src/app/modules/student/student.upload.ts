import fs from "fs";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { extractTextFromPDF, regex } from "./student.upload.utils";
import { ValidateRequest } from "../../middleware/validateRequest";
import { studentValidationSchemas } from "./student.validation";
import { ZodError } from "zod";

export const uploadPDF = catchAsync(async (req, res, next): Promise<void> => {
  const filePath = req.file?.path;
  console.log(filePath, req.file);

  if (!filePath) {
    throw new AppError(400, "File not provided.");
  }

  try {
    if (req?.file?.mimetype !== "application/pdf") {
      fs.unlinkSync(filePath);
      throw new AppError(400, "Only PDF files are allowed.");
    }

    if (!fs.existsSync(filePath)) {
      throw new AppError(404, "File not found.");
    }

    const text = await extractTextFromPDF(filePath);
    const results = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const rollNumber = match[1];
      const subjectCodes = match[2]
        .split(",")
        .map((code) => code.trim())
        .filter((code) => code);

      console.log(req.body, "body::aa");

      const student = {
        rollNumber,
        subjectCodes,
        regulationYear: req?.body?.regulationYear,
        semester: Number(req?.body?.semester),
        userMail: req?.body?.userMail,
      };
      console.log(student);

      // console.log(student, "student");

      // const validate = studentValidationSchemas.uploadpdfValidationSchema.parse(
      //   { body: student }
      // );

      try {
        // studentValidationSchemas.uploadpdfValidationSchema.parse({
        //   body: student,
        // });
        // console.log(validate, "validate");
        const result = new Student(student);
        await result.save();
        results.push(student);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error("Validation failed:", error.errors);
          throw new AppError(400, "validation Error");
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }

    res.json({ results });
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw new AppError(500, "Failed to process the PDF file");
  } finally {
    try {
      if (filePath) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File is deleted.");
          }
        });
      }
    } catch (unlinkErr) {
      throw new AppError(400, "Failed to delete the PDF file");
    }
  }
});

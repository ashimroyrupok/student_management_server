import { z } from "zod";

const uploadpdfValidationSchema = z.object({
  body: z.object({
    rollNumber: z.string().nonempty("Roll number is required"),
    subjectCodes: z
      .array(z.string().nonempty("Subject code is required"))
      .nonempty("At least one subject code is required"),
    regulationYear: z.string().nonempty("Regulation year is required"),
    semester: z
      .number()
      .int()
      .min(1, "Semester must be at least 1")
      .max(8, "Semester must not exceed 8"),
  }),
});


 export const studentValidationSchemas={
    uploadpdfValidationSchema
}
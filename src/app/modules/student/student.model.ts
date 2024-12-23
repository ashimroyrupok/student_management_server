import { model, Schema } from "mongoose";
import { TStudent } from "./student.interface";

const StudentSchema = new Schema<TStudent>(
  {
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    subjectCodes: [
      {
        type: String,
        required: true,
      },
    ],
    regulationYear: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },
  },
  { timestamps: true }
);

export const Student = model<TStudent>("student", StudentSchema);

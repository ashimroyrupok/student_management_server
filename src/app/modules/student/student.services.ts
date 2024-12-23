import AppError from "../../errors/AppError";
import { TStudent, TStudentQuery } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (payload: TStudent) => {
  const result = await Student.create(payload);
  return result;
};

const getallStudentFromDB = async (payload: Partial<TStudentQuery>) => {
  const { page = 1, limit = 10, semester, subjectCode } = payload;
  type TQuery = {
    semester: number;
    subjectCodes: any;
  };
  const query: Partial<TQuery> = {};

  if (semester) query.semester = semester;
  if (subjectCode) query.subjectCodes = { $in: [subjectCode] };

  const students = await Student.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Student.countDocuments(query);

  return {
    students,
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

const updateStudentIntoDB = async (id: String, updateValue: any) => {
  try {
    const student = await Student.findByIdAndUpdate(id, updateValue, {
      new: true,
    });
    if (!student) {
      throw new AppError(404, "Student not found");
    }
    return Student;
  } catch (error) {
    throw new AppError(404, "failed to update student");
  }
};


const deleteStudentFromDB = async (id: String) => {
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      throw new AppError(404, "Student not found");
    }
   return student
  } catch (error) {
    throw new AppError(404, "something went wrong when deleting student");
  }
};

export const StudentServices = {
  createStudentIntoDB,
  getallStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB
};

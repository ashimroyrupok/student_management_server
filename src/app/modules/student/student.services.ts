import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TStudent, TStudentQuery } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (payload: TStudent) => {
  const result = await Student.create(payload);
  return result;
};

const getallStudentFromDB = async (query: Record<string, unknown>) => {
  // const result = await Student.find();
  // return result;
  const productSearchableFields = ["subjectCodes"];
  const productQuery = new QueryBuilder(Student.find(), query)
    .search()
    .filter()
    .paginate();

  const meta = await productQuery.countTotal();
  const res = await productQuery.modelQuery;
  // console.log(res, "response");

  // return {
  //   students,
  //   total: count,
  //   totalPages: Math.ceil(count / limit),
  //   currentPage: page,
  // };
  return { meta, res };
};
// const getallStudentFromDB = async (payload: Partial<TStudentQuery>) => {
//   const { page = 1, limit = 10, semester, subjectCode } = payload;
//   type TQuery = {
//     semester: number;
//     subjectCodes: any;
//   };
//   const query: Partial<TQuery> = {};

//   if (semester) query.semester = semester;
//   if (subjectCode) query.subjectCodes = { $in: [subjectCode] };

//   const students = await Student.find(query)
//     .limit(limit * 1)
//     .skip((page - 1) * limit)
//     .exec();
//   // console.log(students,"from service")
//   const count = await Student.countDocuments(query);

//   return {
//     students,
//     total: count,
//     totalPages: Math.ceil(count / limit),
//     currentPage: page,
//   };
// };

const updateStudentIntoDB = async (id: String, updateValue: any) => {
  console.log(updateValue,"payload data")
  const student = await Student.findByIdAndUpdate(id, updateValue, {
    new: true,
  });
  if (!student) {
    throw new AppError(404, "Student not found");
  }
  return Student;
};

const deleteStudentFromDB = async (id: String) => {
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      throw new AppError(404, "Student not found");
    }
    return student;
  } catch (error) {
    throw new AppError(404, "something went wrong when deleting student");
  }
};

export const StudentServices = {
  createStudentIntoDB,
  getallStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};

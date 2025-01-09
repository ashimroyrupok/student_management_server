import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendRespose";
import { StudentServices } from "./student.services";

const createTestUser = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServices.createStudentIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: "Student is retrieved succesfully",
    statusCode: 200,
    data: result,
  });
});

const getAllStudent = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await StudentServices.getallStudentFromDB(query);
  sendResponse(res, {
    success: true,
    message: " Student is retrieved successfully",
    statusCode: 200,
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body, "in controller update body");
  const result = await StudentServices.updateStudentIntoDB(id, body);
  sendResponse(res, {
    success: true,
    message: " Student is updated successfully",
    statusCode: 200,
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await StudentServices.deleteStudentFromDB(id);
  sendResponse(res, {
    success: true,
    message: " Student is deleted  successfully",
    statusCode: 200,
    data: result,
  });
});

const deleteManyStudent = catchAsync(async (req, res, next) => {
  const { userMail } = req.params;
  console.log(userMail, "mail");
  const result = await StudentServices.deleteManyStudentFromDB(userMail);
  sendResponse(res, {
    success: true,
    message: " Students are deleted  successfully",
    statusCode: 200,
    data: result,
  });
});

export const studentController = {
  createTestUser,
  getAllStudent,
  updateStudent,
  deleteStudent,
  deleteManyStudent,
};

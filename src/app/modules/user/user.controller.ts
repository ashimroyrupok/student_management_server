import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendRespose";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req, res, next) => {

  const result = await UserServices.createTestIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: "user is created successfully",
    statusCode: 200,
    data: result,
  });
});
const LoginUser = catchAsync(async (req, res, next) => {

  const result = await UserServices.verifyUserForLogin(req.body);

  sendResponse(res, {
    success: true,
    message: "user logged in successfully",
    statusCode: 200,
    data: result,
  });
});

export const UserControllers = {
  createUser,
  LoginUser
};

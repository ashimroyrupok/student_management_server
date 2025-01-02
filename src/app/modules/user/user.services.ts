import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser, TUser } from "./user.interface";
import { User } from "./user.model";
import jwt from "jsonwebtoken";
import { createToken } from "./user.utils";

const createTestIntoDB = async (payload: TUser) => {
  const email = payload?.email;
  console.log(email, "service");
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new AppError(400, "User already exists");
  }
  const result = User.create(payload);
  console.log(result, "result,sercvi");
  return result;
};

const verifyUserForLogin = async (payload: TLoginUser) => {
  const email = payload?.email;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(400, "user is not found");
  }

  const isMatch = await User.isPasswordMatched(
    payload?.password,
    user?.password
  );
  if (!isMatch) {
    throw new AppError(400, "password does not match");
  }

  const jwtPayload = {
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expired_in as string
  );

  return { accessToken };
};

const getSingleUserFromDB = async (payload: string) => {
  const result = await User.findOne({ email: payload });
  return result;
};

export const UserServices = {
  createTestIntoDB,
  verifyUserForLogin,
  getSingleUserFromDB,
};

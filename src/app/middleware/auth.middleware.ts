import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import { User } from "../modules/user/user.model";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token, "token");
    // checking if the token is missing
    if (!token) {
      console.log("token not found");
      throw new AppError(503, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;
    console.log({ decoded }, "decoded mal");
    const { email } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email: email });
    // console.log(user, "user");

    if (!user) {
      throw new AppError(404, "invalid token !");
    }

    next();
  });
};

export default auth;

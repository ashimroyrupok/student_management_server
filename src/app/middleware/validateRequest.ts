import { TStudent } from "./../modules/student/student.interface";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

export const ValidateRequest = (
  schema: AnyZodObject,
  student: Partial<TStudent>
) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(student, "validating request");
    await schema.parseAsync({
      body: student,
    });

   
  });
};

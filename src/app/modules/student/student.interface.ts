import { number } from "zod";

 export type TStudent = {
   rollNumber: string;
   subjectCodes: string[];
   regulationYear: string;
   semester: Number;
 };

 export type TStudentQuery={
  page:number;
  limit:number;
  semester:number;
  subjectCode:number

 }
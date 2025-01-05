import { number } from "zod";

 export type TStudent = {
   rollNumber: string;
   subjectCodes: string[];
   regulationYear: string;
   semester: Number;
   userMail:string
 };

 export type TStudentQuery={
  page:number;
  limit:number;
  semester:number;
  subjectCode:number

 }
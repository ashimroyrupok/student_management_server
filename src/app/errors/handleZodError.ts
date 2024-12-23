import { ZodError, ZodIssue } from 'zod';
import {
  TErrorSource,
  TGenericResponseError,
} from '../interface/error.interface';

export const handleZodError = (err: ZodError): TGenericResponseError => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

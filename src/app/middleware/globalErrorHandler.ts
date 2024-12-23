/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error.interface';
import config from '../config';
import { handleZodError } from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidatonError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateCastError from '../errors/handleDuplicateCastError';
import AppError from '../errors/AppError';

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];
  // handle zod errors
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError.errorSources;
  }
  // handle mongoose error from here
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError.errorSources;
  }
  // handle cast error from here
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError.errorSources;
  }
  // handle cast error from here
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateCastError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError.errorSources;
  }
  // handle appError from here
  else if (err instanceof AppError) {
    message = err?.message;
    statusCode = err?.statusCode;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }
  // handle error from here
  else if (err instanceof Error) {
    message = err?.message;

    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  // main return for error messages
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: err,
    stack: config.node_env === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;

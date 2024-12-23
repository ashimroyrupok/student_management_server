import mongoose from 'mongoose';
import {
  TErrorSource,
  TGenericResponseError,
} from '../interface/error.interface';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericResponseError => {
  const errorSources: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'invalid id',
    errorSources,
  };
};

export default handleCastError;

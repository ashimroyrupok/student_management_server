/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSource,
  TGenericResponseError,
} from '../interface/error.interface';

const handleDuplicateCastError = (err: any): TGenericResponseError => {
  // extract value using double quotes using regex

  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleDuplicateCastError;

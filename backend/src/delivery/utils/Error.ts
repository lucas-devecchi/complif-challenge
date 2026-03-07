// import logger from '../../../logger';
import { ErrorType, HandledError } from '../../modules/shared/domain/errors/HandledError';

const getHandledErrorStatusCode = (error: HandledError): number => {
  const type = error.getMessage().type;
  switch (type) {
    case ErrorType.BAD_REQUEST:
      return 400;
    case ErrorType.INVALID_ENUM_VALUE:
      return 400;
    case ErrorType.INVALID_STATE:
      return 400;
    case ErrorType.FORM_INVALID_FIELD:
      return 400;

    case ErrorType.UNAUTHORIZED:
      return 401;

    case ErrorType.USER_AND_TOKEN_MISMATCH:
      return 403;
    case ErrorType.ACCESS_DENIED:
      return 403;
    case ErrorType.INSUFICIENT_PERMISSIONS:
      return 403;

    case ErrorType.RESOURCE_NOT_FOUND:
      return 404;
    case ErrorType.RESOURCES_NOT_FOUND:
      return 404;

    case ErrorType.UNKNOWN:
      return 500;

    default:
      return 500;
  }
};

export const GetErrorStatusCode = (error: Error): number => {
  if (Array.isArray(error)) {
    if (error.every((e) => e instanceof HandledError)) {
      return getHandledErrorStatusCode(error[0] as HandledError);
    }
  }

  if (error instanceof HandledError) {
    return getHandledErrorStatusCode(error);
  }

  return 500;
};

export const GetErrorMessage = (error: Error): any => {
  const getError = (error: Error): any => {
    if (error instanceof HandledError) {
      return error.getMessage();
    }

    if (Array.isArray(error)) {
      if (error.every((e) => e instanceof HandledError)) {
        return error.map((e) => e.getMessage());
      }
    }

    return {
      type: ErrorType.UNKNOWN,
      params: {
        message: error.message,
      }
    };
  };

  const e = getError(error);
//   logger.error(e);
  return e;
};
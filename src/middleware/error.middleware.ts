import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';
require('express-async-errors');

interface CustomError extends Error {
  statusCode?: number;
}
function errorMiddleware(err: CustomError, req: Request, res: Response, next: NextFunction) {
  let statusCode: number;
  switch (err.message) {
    case "Insufficient funds":
      statusCode = httpStatus.BAD_REQUEST;
      break;
    case "Participant not found":
      statusCode = httpStatus.NOT_FOUND;
      break;
    case "Game not found":
      statusCode = httpStatus.NOT_FOUND;
      break;
    case "Invalid ID":
      statusCode = httpStatus.BAD_REQUEST;
      break;
    case "Invalid data":
      statusCode = httpStatus.BAD_REQUEST;
      break;
    case "Game already finished":
      statusCode = httpStatus.BAD_REQUEST;
      break;
    case "Invalid bet amount":
      statusCode = httpStatus.BAD_REQUEST;
      break;
    
    default:
      statusCode = httpStatus.INTERNAL_SERVER_ERROR; 
      break;
  }

  err.statusCode = statusCode;

  res.status(statusCode).send({
    error: {
      message: err.message,
      statusCode: statusCode,
    },
  });

  next();
}

export default errorMiddleware;
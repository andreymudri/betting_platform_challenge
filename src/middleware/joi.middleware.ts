import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import { Schema } from "joi";
require('express-async-errors');

export default function validateBody(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).send({ error: 'Invalid data' });
    }
  };
}
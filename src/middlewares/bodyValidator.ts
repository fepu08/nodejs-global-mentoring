import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { autoSuggestUserSchema, userSchema } from '../schemas/userSchema';
import { errorResponse } from '../errors/joiError';

function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error?.isJoi) {
      res.status(400).json(errorResponse(error.details));
    } else {
      return next();
    }
  };
}

export const validateUser = validate(userSchema);
export const validateAutoSuggestUser = validate(autoSuggestUserSchema);

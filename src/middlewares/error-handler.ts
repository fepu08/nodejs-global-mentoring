import { Request, Response, NextFunction } from 'express';
import { logger } from '../loggers/logger';

export const handleNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  logRequestError(err, req);
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

const logRequestError = (error: Error, req: Request) => {
  const { method, path, params, query, body } = req;
  const message = `[${method}] ${path} - params: ${JSON.stringify(
    params
  )}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(
    body
  )}, error: ${JSON.stringify(error.message)}`;
  logger.error(message);
};

export default { handleError, handleNotFound };

import { Request, Response, NextFunction } from 'express';

export const handleNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const handleError = (err: Error, req: Request, res: Response) => {
  const { method, path, params, query, body } = req;
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = `[${method}] ${path} - params: ${JSON.stringify(
    params
  )}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(
    body
  )}, error: ${JSON.stringify(err.message)}`;

  console.error(message);
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default { handleError, handleNotFound };

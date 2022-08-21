import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

export function apiMethodLoggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { method, path, params, query, body } = req;
  const message = `[${method}] ${path} - params: ${JSON.stringify(
    params
  )}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`;
  logger.info(message);
  next();
}

import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.path === '/api/users/login') {
    return next();
  }

  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const bearerToken = token.split(' ');

  jwt.verify(bearerToken[1], process.env.JWT_SECRET, (err: VerifyErrors) => {
    if (err) {
      res.status(403).json({ message: err.message });
    }
    next();
  });
}

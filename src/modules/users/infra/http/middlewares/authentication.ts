import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

interface TokenPayload {
  iat: string;
  exp: number;
  sub: string;
}

export default function (
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing.', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.secret);

    const { sub } = decodedToken as TokenPayload;

    request.id = sub;

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token.', 401);
  }
}

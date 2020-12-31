import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

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
  const auth = request.headers.authorization;

  if (!auth) throw new AppError('JWT token is missing', 401);

  const [, token] = auth.split(' ');

  try {
    const decodedToken = verify(token, authConfig.secret);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}

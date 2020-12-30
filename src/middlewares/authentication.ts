import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../config/auth';

interface TokenPayload {
  iat: string;
  exp: number;
  sub: string;
}

export default function (
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const headers = request.headers.authorization;

  if (!headers) throw Error('JWT Token is missing.');

  const [, token] = headers.split(' ');

  try {
    const { secret } = auth;
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw Error('Invalid JWT token.');
  }
}

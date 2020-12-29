import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface TokenPayload {
  iad: string;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw Error('JWT Token is missing.');

  const [, token] = authHeader.split(' ');

  const {
    jwt: { secret },
  } = auth;

  try {
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

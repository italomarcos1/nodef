import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: string;
  exp: number;
  sub: string;
}

export default function (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const auth = request.headers.authorization;

  if (!auth)
    return response.status(400).json({ error: 'JWT token is missing.' });

  const [, token] = auth.split(' ');

  try {
    const decodedToken = verify(token, authConfig.secret);

    const { sub } = decodedToken as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Invalid JWT token.' });
  }
}

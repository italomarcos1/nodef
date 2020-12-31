import express, { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';
import 'express-async-errors';

createConnection();

import routes from '../http/routes';
import AppError from '@shared/errors/AppError';

const server = express();
server.use(express.json());
server.use(routes);

server.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

server.get('/', (request, response) =>
  response.json({ message: 'up and running.' }),
);

server.listen(3333, () => console.log('Running...'));

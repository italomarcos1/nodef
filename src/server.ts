import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { createConnection } from 'typeorm';

createConnection();

import AppError from './errors/AppError';

import routes from './routes';
import multerConfig from './config/multer';

const server = express();
server.use(express.json());
server.use(routes);
server.use('/files', express.static(multerConfig.tmpFolder));

server.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
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
  response.json({ message: 'Up and running.' }),
);

server.listen(3333, () => console.log('Rodando...'));

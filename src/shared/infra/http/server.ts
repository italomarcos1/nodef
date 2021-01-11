import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { createConnection } from 'typeorm';
createConnection();

import AppError from '@shared/errors/AppError';

import '@shared/container';
import routes from './routes';

const server = express();
server.use(express.json());
server.use(routes);

server.get('/', (_, response) => response.json({ message: 'batata doce' }));

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

server.listen(3333, () => console.log('Rodando...'));

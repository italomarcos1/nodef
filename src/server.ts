import express from 'express';
import { createConnection } from 'typeorm';

createConnection();

import routes from './routes';

const server = express();
server.use(express.json());
server.use(routes);

server.get('/', (request, response) =>
  response.json({ message: 'Up and running.' }),
);

server.listen(3333, () => console.log('Rodando...'));

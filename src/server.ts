import express from 'express';

import routes from './routes';

const server = express();

server.get('/', (request, response) =>
  response.json({ message: 'Up and running.' }),
);

server.use(express.json());

server.use(routes);

server.listen(3333, () => console.log('Rodando...'));

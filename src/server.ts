import express from 'express';

import routes from './routes';

const server = express();
server.use(express.json());
server.use(routes);

server.get('/', (request, response) =>
  response.json({ message: 'batata doce' }),
);

server.listen(3333, () => console.log('Rodando...'));

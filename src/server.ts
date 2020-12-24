import express from 'express';

const server = express();

server.get('/', (request, response) =>
  response.json({ message: 'batata doce' }),
);

server.listen(3333, () => console.log('Rodando...'));

import { Router } from 'express';

import { getRepository } from 'typeorm';

import User from '../models/User';

const sessionsRouter = Router();

import AuthenticateUserService from '../services/AuthenticateUserService';

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = getRepository(User);

  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const loginResponse = await authenticateUserService.execute({
    email,
    password,
  });

  return response.json(loginResponse);
});

export default sessionsRouter;

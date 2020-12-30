import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const usersRepository = getRepository(User);

    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
    );

    const loginResponse = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json(loginResponse);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;

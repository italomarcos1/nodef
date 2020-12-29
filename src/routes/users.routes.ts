import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const usersRepository = getRepository(User);
    const createUserService = new CreateUserService(usersRepository);

    const { id } = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json({ id, name, email });
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default usersRouter;

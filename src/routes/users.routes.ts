import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import authentication from '../middlewares/authentication';

import uploadConfig from '../config/multer';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  authentication,
  upload.single('file'),
  async (request, response) => {
    try {
      const {
        user: { id: userId },
        file: { filename: avatarUrl },
      } = request;

      const usersRepository = getRepository(User);
      const updateUserAvatarService = new UpdateUserAvatarService(
        usersRepository,
      );

      const user = await updateUserAvatarService.execute({
        userId,
        avatarUrl,
      });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default usersRouter;

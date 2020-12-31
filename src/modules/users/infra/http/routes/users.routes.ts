import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import multerConfig from '@config/multer';

import authentication from '../middlewares/authentication';

const usersRouter = Router();
const upload = multer(multerConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersRepository = getRepository(User);
  const createUserService = new CreateUserService(usersRepository);

  const user = await createUserService.execute({ name, email, password });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  authentication,
  upload.single('file'),
  async (request, response) => {
    const {
      user: { id: userId },
      file: { filename: avatarUrl },
    } = request;

    const usersRepository = getRepository(User);
    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository,
    );

    const user = await updateUserAvatarService.execute({ userId, avatarUrl });

    return response.json(user);
  },
);

export default usersRouter;

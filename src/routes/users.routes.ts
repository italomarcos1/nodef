import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateAvatarService';

import multerConfig from '../config/multer';
import authentication from '../middlewares/authentication';

const usersRouter = Router();
const upload = multer(multerConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersRepository = getRepository(User);
  const createUserService = new CreateUserService(usersRepository);

  const { id } = await createUserService.execute({
    name,
    email,
    password,
  });

  return response.json({ id, name, email });
});

usersRouter.patch(
  '/avatar',
  authentication,
  upload.single('file'),
  async (request, response) => {
    const {
      user: { id: userId },
      file: { filename: avatarFilename },
    } = request;

    const usersRepository = getRepository(User);

    const updateAvatarService = new UpdateAvatarService(usersRepository);

    const user = await updateAvatarService.execute({
      userId,
      avatarFilename,
    });

    return response.json(user);
  },
);

export default usersRouter;

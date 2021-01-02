import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import multerConfig from '@config/multer';

import authentication from '../middlewares/authentication';

const usersRouter = Router();
const upload = multer(multerConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = container.resolve(CreateUserService);

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

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({ userId, avatarUrl });

    return response.json(user);
  },
);

export default usersRouter;

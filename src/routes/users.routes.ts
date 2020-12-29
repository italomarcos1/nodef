import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import uploadConfig from '../config/multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = getRepository(User);

    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository,
    );

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatar: request.file.filename,
    });

    return response.json(user);
  },
);

export default usersRouter;

import { Router } from 'express';
import multer from 'multer';

import UserController from '@modules/users/controllers/UserController';
import UserAvatarController from '@modules/users/controllers/UserAvatarController';
import multerConfig from '@config/multer';

import authentication from '../middlewares/authentication';

const usersRouter = Router();
const upload = multer(multerConfig);
const userController = new UserController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', userController.create);

usersRouter.patch(
  '/avatar',
  authentication,
  upload.single('file'),
  userAvatarController.create,
);

export default usersRouter;

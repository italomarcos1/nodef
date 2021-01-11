import { Router } from 'express';
import multer from 'multer';

import multerConfig from '@config/multer';

import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';
import authenticate from '../middlewares/authenticate';

const usersRouter = Router();
const upload = multer(multerConfig);
const userController = new UserController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', userController.create);
usersRouter.post(
  '/avatar',
  authenticate,
  upload.single('file'),
  userAvatarController.create,
);

export default usersRouter;

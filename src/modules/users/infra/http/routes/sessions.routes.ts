import { Router } from 'express';

import SessionController from '@modules/users/controllers/SessionController';

const sessionsRouter = Router();
const sessionsController = new SessionController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;

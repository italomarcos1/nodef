import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/appointments', ensureAuthenticated, appointmentsRouter);

export default routes;

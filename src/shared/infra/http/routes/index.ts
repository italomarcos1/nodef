import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;

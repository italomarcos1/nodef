import { Router } from 'express';

import authentication from '@modules/users/infra/http/middlewares/authentication';
import AppointmentController from '@modules/appointments/controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();

appointmentsRouter.use(authentication);

// appointmentsRouter.get('/', async (_, response) => {
//   const appointmentsRepository = getRepository(Appointment);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;

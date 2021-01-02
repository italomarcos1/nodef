import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import authentication from '@modules/users/infra/http/middlewares/authentication';

const appointmentsRouter = Router();

appointmentsRouter.use(authentication);

// appointmentsRouter.get('/', async (_, response) => {
//   const appointmentsRepository = getRepository(Appointment);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, booking_date } = request.body;

  const parsedDate = parseISO(booking_date);

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;

import { Router } from 'express';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';

const appointmentsRouter = Router();

// appointmentsRouter.get('/', async (_, response) => {
//   const appointmentsRepository = new AppointmentsRepository();
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, booking_date } = request.body;

  const parsedDate = parseISO(booking_date);

  const appointmentsRepository = new AppointmentsRepository();
  const createAppointmentService = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointmentService.execute({
    provider_id,
    booking_date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;

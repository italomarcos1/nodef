import { getRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';

import Appointment from '../models/Appointment';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (_, response) => {
  const appointmentsRepository = getRepository(Appointment);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointmentsRepository = getRepository(Appointment);
    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default appointmentsRouter;

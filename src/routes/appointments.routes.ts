import { getRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Appointment from '../models/Appointment';
import User from '../models/User';

import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (_, response) => {
  try {
    const appointmentsRepository = getRepository(Appointment);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointmentsRepository = getRepository(Appointment);
    const usersRepository = getRepository(User);
    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
      usersRepository,
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

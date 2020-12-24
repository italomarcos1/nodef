import { Router } from 'express';
import { isEqual, startOfHour, parseISO } from 'date-fns';

import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointment = appointments.find((appointment) =>
    isEqual(appointment.date, parsedDate),
  );

  if (findAppointment)
    return response.status(400).json({ error: 'Appointment has been taken' });

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;

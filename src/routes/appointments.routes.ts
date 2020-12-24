import { Router } from 'express';
import { v4 } from 'uuid';
import { isEqual, startOfHour, parseISO } from 'date-fns';

const appointmentsRouter = Router();

interface IAppointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: IAppointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointment = appointments.find((appointment) =>
    isEqual(appointment.date, parsedDate),
  );

  if (findAppointment)
    return response.status(400).json({ error: 'Appointment has been taken.' });

  const appointment = {
    id: v4(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;

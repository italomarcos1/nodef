import { Router } from 'express';
import { v4 } from 'uuid';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { providerId, date } = request.body;

  const appointment = {
    id: v4(),
    providerId,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;

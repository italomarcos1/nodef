import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  public execute({ provider, date }: Request): Appointment {
    const startDate = startOfHour(date);

    const findAppointment = this.appointmentsRepository.findByDate(startDate);

    if (findAppointment) throw Error('This appointment has been taken.');

    const appointment = new Appointment({ provider, date: startDate });

    this.appointmentsRepository.create(appointment);

    return appointment;
  }
}

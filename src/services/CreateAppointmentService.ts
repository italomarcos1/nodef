import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const startDate = startOfHour(date);

    const findAppointment = this.appointmentsRepository.findByDate(startDate);

    if (findAppointment) throw Error('This appointment has been taken.');

    const appointment = this.appointmentsRepository.create({
      provider,
      date: startDate,
    });

    return appointment;
  }
}

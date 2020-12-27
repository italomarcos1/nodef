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

    const findAppointmentByDate = this.appointmentsRepository.findByDate(
      startDate,
    );

    if (findAppointmentByDate) throw Error('This hour is already taken.');

    const appointment = this.appointmentsRepository.create({
      provider,
      date: startDate,
    });

    return appointment;
  }
}

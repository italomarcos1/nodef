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

  public async execute({ provider, date }: Request): Promise<Appointment> {
    const startDate = startOfHour(date);

    const findAppointmentByDate = await this.appointmentsRepository.findByDate(
      startDate,
    );

    if (findAppointmentByDate) throw Error('This appointment has been taken.');

    const appointment = this.appointmentsRepository.create({
      provider,
      date: startDate,
    });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}

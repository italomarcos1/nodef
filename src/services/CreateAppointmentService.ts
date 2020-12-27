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
    const appointmentDate = startOfHour(date);
    const findAppointmentByDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentByDate)
      throw Error("Sorry, there's a booking in the selected hour.");

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}

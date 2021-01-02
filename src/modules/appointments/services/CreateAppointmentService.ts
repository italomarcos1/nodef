import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';

interface Request {
  provider_id: string;
  booking_date: Date;
}

export default class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    provider_id,
    booking_date,
  }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(booking_date);

    const appointmentAlreadyBooked = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentAlreadyBooked)
      throw new AppError('This hour is already taken.');

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      booking_date: appointmentDate,
    });

    return appointment;
  }
}

import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const alreadyBooked = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (alreadyBooked) throw new AppError('This appointment has been taken.');

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      booking_date: appointmentDate,
    });

    return appointment;
  }
}

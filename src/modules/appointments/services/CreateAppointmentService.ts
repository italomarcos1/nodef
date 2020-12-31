import { startOfHour } from 'date-fns';
import { Repository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface Request {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentService {
  private appointmentsRepository: Repository<Appointment>;

  constructor(appointmentsRepository: Repository<Appointment>) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const alreadyBooked = await this.appointmentsRepository.findOne({
      where: { booking_date: appointmentDate },
    });

    if (alreadyBooked) throw new AppError('This appointment has been taken.');

    const appointment = this.appointmentsRepository.create({
      provider_id,
      booking_date: appointmentDate,
    });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}

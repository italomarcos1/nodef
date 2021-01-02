import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

export default class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { booking_date: date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    booking_date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      booking_date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

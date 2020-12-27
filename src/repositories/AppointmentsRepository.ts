import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointmentByDate = await this.findOne({
      where: { date },
    });

    return findAppointmentByDate || undefined;
  }
}

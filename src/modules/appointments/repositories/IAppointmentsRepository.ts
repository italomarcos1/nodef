import Appointment from '../infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '../dtos/CreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}

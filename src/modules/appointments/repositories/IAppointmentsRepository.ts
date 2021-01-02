import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppoinmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: CreateAppointmentDTO): Promise<Appointment>;
}

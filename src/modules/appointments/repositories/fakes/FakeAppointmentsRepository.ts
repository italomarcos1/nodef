import { v4 } from 'uuid';
import { isEqual } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(({ booking_date }) =>
      isEqual(booking_date, date),
    );

    return findAppointment;
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), ...data });

    this.appointments.push(appointment);

    return appointment;
  }
}

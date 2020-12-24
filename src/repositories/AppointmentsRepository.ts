import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

export default class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | undefined {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date),
    );

    return findAppointment || undefined;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}

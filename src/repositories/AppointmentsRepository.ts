import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

export default class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
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

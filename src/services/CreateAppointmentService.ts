import { startOfHour } from 'date-fns';
import { Repository } from 'typeorm';
import Appointment from '../models/Appointment';
import User from '../models/User';

interface Request {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentService {
  private appointmentsRepository: Repository<Appointment>;
  private usersRepository: Repository<User>;

  constructor(
    appointmentsRepository: Repository<Appointment>,
    usersRepository: Repository<User>,
  ) {
    this.appointmentsRepository = appointmentsRepository;
    this.usersRepository = usersRepository;
  }

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const bookingAlreadyTaken = await this.appointmentsRepository.findOne({
      where: { booking_date: appointmentDate },
    });

    if (bookingAlreadyTaken)
      throw Error("There's an appointment set to this hour.");
    console.log(provider_id);
    console.log('1');

    const providerExists = await this.usersRepository.findOne({
      where: { id: provider_id },
    });
    console.log('2');

    if (!providerExists)
      throw Error("The ID provided doesn't match any of our providers.");

    console.log('3');

    const appointment = this.appointmentsRepository.create({
      provider_id,
      booking_date: appointmentDate,
    });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}

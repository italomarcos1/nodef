import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create an appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      provider_id: '124',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('124');
  });

  it('should not be able to book two appointments at the same hour', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    await createAppointmentService.execute({
      provider_id: '124',
      date: new Date(),
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '123',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

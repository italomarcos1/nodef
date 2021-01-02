import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      provider_id: '789',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('789');
  });

  it('should not be able to create two appointments at the same hour', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    await createAppointmentService.execute({
      provider_id: '789',
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

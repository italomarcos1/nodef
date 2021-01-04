import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/UsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create an user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'name',
      email: 'email',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('name');
  });

  it('should not be able to create an already registered user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'name',
      email: 'email',
      password: 'password',
    });

    await expect(
      createUserService.execute({
        name: 'name',
        email: 'email',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

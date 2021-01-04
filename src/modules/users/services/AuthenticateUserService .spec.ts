import UsersRepository from '../repositories/fakes/UsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new UsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'name',
      email: 'email',
      password: 'password',
    });

    const response = await authenticateUserService.execute({
      email: 'email',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});

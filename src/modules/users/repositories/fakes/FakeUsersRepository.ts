import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { v4 } from 'uuid';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(({ id: userId }) => userId === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(
      ({ email: userEmail }) => userEmail === email,
    );

    return findUser;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4(), ...data });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findUserIndex = this.users.findIndex(({ id }) => id === user.id);

    this.users[findUserIndex] = user;

    return user;
  }
}

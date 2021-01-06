import { v4 } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(({ id: userId }) => id === userId);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(({ email: userEmail }) => email === userEmail);
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

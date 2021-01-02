import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUserById = await this.ormRepository.findOne(id);

    return findUserById;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUserByEmail = await this.ormRepository.findOne({
      where: { email },
    });

    return findUserByEmail;
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    delete user.password;

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

import ICreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findById = await this.ormRepository.findOne(id);

    return findById;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findByEmail = await this.ormRepository.findOne({ where: { email } });

    return findByEmail;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    delete user.password;

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    delete user.password;

    return user;
  }
}

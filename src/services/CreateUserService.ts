import { Repository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  private usersRepository: Repository<User>;

  constructor(usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) throw Error('This email address is already taken.');

    const user = this.usersRepository.create({ name, email, password });

    await this.usersRepository.save(user);

    return user;
  }
}

import { Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

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
    const userAlreadyExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (userAlreadyExists)
      throw new AppError('This email address is already in use.');

    const hashedPassword = await hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

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
    console.log('1');
    if (userAlreadyExists)
      throw new AppError('This email address is already taken');
    console.log('2');

    const hashedPassword = await hash(password, 8);
    console.log('3');

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log('4');
    console.log(user);

    await this.usersRepository.save(user);

    delete user.password;

    console.log('5');

    return user;
  }
}

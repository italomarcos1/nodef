import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import User from '../infra/typeorm/entities/User';
import authConfig from '@config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  private usersRepository: Repository<User>;

  constructor(usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) throw new AppError('Incorrect email/password combination.');

    const userPassword = user.password ? user.password : '---';

    const doesPasswordsMatch = await compare(password, userPassword);

    if (!doesPasswordsMatch)
      throw new AppError('Incorrect email/password combination.');

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}

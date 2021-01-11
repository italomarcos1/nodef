import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination.');

    const userPassword = user.password ? user.password : '---';

    const doesPasswordsMatch = await this.hashProvider.compareHash(
      password,
      userPassword,
    );

    if (!doesPasswordsMatch)
      throw new AppError('Incorrect email/password combination');

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

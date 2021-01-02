import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';

import authConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';

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
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination', 401);

    const userPassword = user.password ? user.password : '---';

    const passwordMatch = await compare(password, userPassword);

    if (!passwordMatch)
      throw new AppError('Incorrect email/password combination.', 401);

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}

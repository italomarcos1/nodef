import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import auth from '../config/auth';

import User from '../models/User';

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

    if (!user) throw Error('Incorrect email/password combination.');

    const userPassword = user?.password ? user.password : '---';

    const doesPasswordsMatch = await compare(password, userPassword);

    if (!doesPasswordsMatch)
      throw Error('Incorrect email/password combination.');

    const { secret, expiresIn } = auth;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}

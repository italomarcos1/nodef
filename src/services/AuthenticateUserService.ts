import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

export default class AuthenticateUserService {
  private usersRepository: Repository<User>;

  constructor(usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findOne({ where: { email } });

    const userPassword = user?.password ? user.password : '';

    if (!user) throw Error('Incorrect email/password combination.');

    const passwordsMatch = await compare(password, userPassword);

    if (!passwordsMatch) throw Error('Incorrect email/password combination.');

    delete user.password;

    return { user };
  }
}

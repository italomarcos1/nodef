import { Repository } from 'typeorm';
import { join } from 'path';
import { promises } from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import multerConfig from '@config/multer';

interface Request {
  userId: string;
  avatarUrl: string;
}

export default class UpdateUserAvatarService {
  private usersRepository: Repository<User>;

  constructor(usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  public async execute({ userId, avatarUrl }: Request): Promise<User> {
    const user = await this.usersRepository.findOne(userId);

    if (!user) throw new AppError('User not found', 401);

    if (user.avatar) {
      const avatarFilePath = join(multerConfig.destination, user.avatar);
      const doesAvatarExists = await promises.stat(avatarFilePath);

      if (doesAvatarExists) await promises.unlink(avatarFilePath);
    }

    user.avatar = avatarUrl;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

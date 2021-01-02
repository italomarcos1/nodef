import { Repository } from 'typeorm';
import { promises } from 'fs';
import { join } from 'path';

import multerConfig from '@config/multer';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
  userId: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  private usersRepository: Repository<User>;

  constructor(usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findOne(userId);

    if (!user) throw new AppError('User not found.');

    if (user.avatar) {
      const avatarFilePath = join(multerConfig.destination, user.avatar);
      const doesAvatarExists = await promises.stat(avatarFilePath);

      if (doesAvatarExists) await promises.unlink(avatarFilePath);
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

import { Repository } from 'typeorm';
import { join } from 'path';
import fs from 'fs';

import multerConfig from '../config/multer';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  userId: string;
  avatarFilename: string;
}

export default class UpdateAvatarService {
  private usersRepository: Repository<User>;

  constructor(usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findOne(userId);

    if (!user) throw new AppError('User not found.');

    if (user.avatar) {
      const avatarPath = join(multerConfig.tmpFolder, user.avatar);
      const avatarExists = await fs.promises.stat(avatarPath);

      if (avatarExists) await fs.promises.unlink(avatarPath);
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

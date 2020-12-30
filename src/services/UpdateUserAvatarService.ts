import { Repository } from 'typeorm';
import fs from 'fs';
import { join } from 'path';

import uploadConfig from '../config/multer';

import User from '../models/User';

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

    if (!user) throw Error('User not found');

    if (user.avatar) {
      const avatarFilePath = join(uploadConfig.tmpFolder, user.avatar);
      const avatarFileExists = await fs.promises.stat(avatarFilePath);

      if (avatarFileExists) await fs.promises.unlink(avatarFilePath);
    }

    user.avatar = avatarUrl;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

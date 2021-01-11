import { inject, injectable } from 'tsyringe';

import { join } from 'path';
import { promises } from 'fs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

import multerConfig from '@config/multer';
import { fromString } from 'uuidv4';

interface Request {
  userId: string;
  avatarFilename: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError('User not found.');

    if (user.avatar) {
      const avatarFilePath = join(multerConfig.destination, user.avatar);
      const avatarFileExists = await promises.stat(avatarFilePath);

      if (avatarFileExists) await promises.unlink(avatarFilePath);
    }

    user.avatar = avatarFilename;

    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }
}

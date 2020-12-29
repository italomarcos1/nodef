import { Repository } from 'typeorm';
import fs from 'fs';
import { join } from 'path';
import multer from '../config/multer';
import User from '../models/User';

interface Request {
  user_id: string;
  avatar: string;
}

export default class UpdateUserAvatarService {
  private usersRepository: Repository<User>;

  constructor(usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  public async execute({ user_id, avatar }: Request): Promise<User> {
    const user = await this.usersRepository.findOne(user_id);

    if (!user) throw Error("There's no user that matches this id.");

    if (user.avatar) {
      const userAvatarFilePath = join(multer.tmpFolder, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatar;

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      user: { id: userId },
      file: { filename: avatarUrl },
    } = request;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({ userId, avatarUrl });

    return response.json(user);
  }
}

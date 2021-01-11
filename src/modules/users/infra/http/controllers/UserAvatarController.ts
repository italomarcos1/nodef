import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      id: userId,
      file: { filename: avatarFilename },
    } = request;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      userId,
      avatarFilename,
    });

    return response.json(user);
  }
}

import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const authenticateUser = new AuthenticateUserService();

    const { email, password } = request.body;

    const session = await authenticateUser.run({
      email,
      password,
    });

    return response.json(session);
  }
}

export default new SessionsController();

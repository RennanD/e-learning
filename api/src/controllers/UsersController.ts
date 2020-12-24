import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService();

    const { name, email, password } = request.body;

    const user = await createUser.run({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}

export default new UsersController();

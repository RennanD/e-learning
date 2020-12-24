import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async run({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const existentUser = await usersRepository.findOne({
      where: { email },
    });

    if (existentUser) {
      throw new AppError('Este usuário já possui uma conta.');
    }

    const user = usersRepository.create({
      name,
      password,
      email,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;

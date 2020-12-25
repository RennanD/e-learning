import { getRepository } from 'typeorm';

import { hash } from 'bcryptjs';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

interface Response {
  id: string;
  email: string;
  name: string;
  role: string;
}

class CreateUserService {
  public async run({ name, email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const existentUser = await usersRepository.findOne({
      where: { email },
    });

    if (existentUser) {
      throw new AppError('Este usuário já possui uma conta.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    await usersRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

export default CreateUserService;

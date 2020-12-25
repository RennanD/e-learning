import { getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import AppError from '../errors/AppError';

import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface UserSession {
  id: string;
  email: string;
  name: string;
}

interface Session {
  user: UserSession;
  token: string;
}

class AuthenticateUserService {
  public async run({ email, password }: Request): Promise<Session> {
    const usersRespository = getRepository(User);

    const userExists = await usersRespository.findOne({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new AppError('Credênciais inválidas', 'permission_error', 401);
    }

    const checkPassword = await compare(password, userExists.password);

    if (!checkPassword) {
      throw new AppError('Credênciais inválidas', 'permission_error', 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const subject = JSON.stringify({
      id: userExists.id,
      role: userExists.role,
    });

    const token = sign({}, secret, {
      subject,
      expiresIn,
    });

    return {
      user: {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
      },
      token,
    };
  }
}

export default AuthenticateUserService;

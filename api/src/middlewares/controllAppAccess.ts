import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenSubjet {
  id: string;
  role: 'ADMIN' | 'USER';
}

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 'permission_error', 401);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub, exp } = decoded as TokenPayload;

    const subject: TokenSubjet = JSON.parse(sub);

    const current_time = Date.now() / 1000;

    if (exp < current_time) {
      throw new AppError('Invalid JWT token', 'auth_error', 401);
    }

    request.user = {
      subject,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 'permission_error', 401);
  }
}

export function ensureAdminAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 'permission_error', 401);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub, exp } = decoded as TokenPayload;

    const subject: TokenSubjet = JSON.parse(sub);

    if (subject.role !== 'ADMIN') {
      throw new AppError('Access Dinned', 'permission_error', 401);
    }

    const current_time = Date.now() / 1000;

    if (exp < current_time) {
      throw new AppError('Invalid JWT token', 'auth_error', 401);
    }

    request.user = {
      subject,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 'permission_error', 401);
  }
}

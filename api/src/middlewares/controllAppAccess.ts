import { Request, Response, NextFunction } from 'express';

import { verify, TokenExpiredError } from 'jsonwebtoken';

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

  if (!secret) {
    throw new AppError('Invalid secret token', 'auth_error', 401);
  }

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    const subject: TokenSubjet = JSON.parse(sub);

    request.user = {
      subject,
    };

    return next();
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.message, err.type, err.statusCode);
    }

    if (err instanceof TokenExpiredError) {
      throw new AppError('Your session has expired', 'auth_error', 401);
    }

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

  if (!secret) {
    throw new AppError('Invalid secret token', 'auth_error', 401);
  }

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    const subject: TokenSubjet = JSON.parse(sub);

    if (subject.role !== 'ADMIN') {
      throw new AppError('Access dinned!', 'permission_error', 401);
    }

    request.user = {
      subject,
    };

    return next();
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.message, err.type, err.statusCode);
    }

    if (err instanceof TokenExpiredError) {
      throw new AppError('Your session has expired', 'auth_error', 401);
    }

    throw new AppError('Invalid JWT token', 'permission_error', 401);
  }
}

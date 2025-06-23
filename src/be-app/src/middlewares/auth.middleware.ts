// src/auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('AuthMiddleware executed...');
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided or invalid format' });
    }
    const token = authorizationHeader.split(' ')[1];
    if (token === 'my-secret-token') {
      (req as any).user = { userId: 1, username: 'testuser' };
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }
}
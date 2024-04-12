import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED, reply } from '../controllers/utils.js';
import AuthController from '../controllers/auth-controller.js';

/**
 * Authenticated middleware
 * Protects the route from unauthorized access
 */
export const authenticatedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const cookieToken = req.cookies.token;
  const headerToken = req.headers.authorization;

  const token = cookieToken || headerToken;

  if (!token) return reply(res, UNAUTHORIZED);

  const user = await AuthController.authenticate(token);
  if (!user) return reply(res, UNAUTHORIZED);

  // Success
  req.context.user = user;
  next();
};

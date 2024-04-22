import { Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/auth-controller.js';

/**
 * Authenticate middleware
 * Try to authenticate the user with the token provided in the cookie or header
 * Sets the user property in the response object if the token is valid
 */
export const authenticateMiddleware = async (req: Request, _: Response, next: NextFunction) => {
  const cookieToken = req.cookies.token;
  const headerToken = req.headers.authorization;

  const token = cookieToken || headerToken;
  if (!token) return next();

  const user = await AuthController.authenticate(token);
  if (user) req.context.user = user;
  next();
};

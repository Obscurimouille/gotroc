import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED, reply } from '../controllers/utils.js';

/**
 * Admin middleware
 * Protects the route from unauthorized access
 */
export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.context.user;
  if (!user) return reply(res, UNAUTHORIZED);

  if (!user.isAdmin) return reply(res, UNAUTHORIZED);
  next();
};

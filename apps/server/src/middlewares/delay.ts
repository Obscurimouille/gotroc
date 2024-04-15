import { Request, Response, NextFunction } from 'express';
import env from '../services/env-service.js';

type Options = {
  devOnly?: boolean;
};

export const delayMiddleware = (delay: number, params: Options) => {
  return async (_req: Request, _res: Response, next: NextFunction) => {
    // Skip if devOnly and not in development
    if (params?.devOnly && env.get.NODE_ENV !== 'development') {
      return next();
    }
    setTimeout(next, delay);
  };

}

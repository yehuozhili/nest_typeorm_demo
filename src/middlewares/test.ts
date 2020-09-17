import { NextFunction, Request, Response } from 'express';

export const testMiddleWares = () => {
  return (_req: Request, _res: Response, next: NextFunction) => {
    console.log('test中间件');
    next();
  };
};

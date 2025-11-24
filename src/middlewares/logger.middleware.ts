import { Request, Response, NextFunction } from "express";

export class LoggerMiddleware {
  public log = (req: Request, res: Response, next: NextFunction): void => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.url}`);
    next();
  };
}

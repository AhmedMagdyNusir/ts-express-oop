import { Request, Response, NextFunction } from "express";

export class ErrorHandlerMiddleware {
  constructor(private isDevelopmentMode: boolean) {}

  public handle = (err: any, req: Request, res: Response, next: NextFunction): void => {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      statusCode: err.statusCode || 500,
      message: err.message,
      ...(this.isDevelopmentMode ? { stack: err.stack } : {}),
    });
  };
}

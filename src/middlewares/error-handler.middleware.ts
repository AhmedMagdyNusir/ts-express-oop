import { Request, Response, NextFunction } from "express";
import { config } from "@/utils/config";

export class ErrorHandlerMiddleware {
  public handle = (err: any, req: Request, res: Response, next: NextFunction): void => {
    res.status(err.statusCode || 500).json({
      status: err.status || "error",
      statusCode: err.statusCode || 500,
      message: err.message,
      ...(config.isDevelopmentMode ? { stack: err.stack } : {}),
    });
  };
}

import express, { Application, Router, Request, Response, NextFunction } from "express";
import { LoggerMiddleware } from "@/middlewares/logger.middleware";
import { ErrorHandlerMiddleware } from "@/middlewares/error-handler.middleware";
import { ApiError } from "@/utils/api-error";

export class App {
  private app: Application;

  constructor(
    private routes: { path: string; router: Router }[],
    private loggerMiddleware: LoggerMiddleware,
    private errorHandlerMiddleware: ErrorHandlerMiddleware,
  ) {
    this.app = express();

    // Initialize middlewares
    this.app.use(express.json());
    this.app.use(this.loggerMiddleware.log);

    // Initialize routes
    this.routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });

    // Handle 404 errors for all other routes
    this.app.use("/*splat", (req: Request, res: Response, next: NextFunction) =>
      next(new ApiError(404, `This route does not exist: ${req.originalUrl}`)),
    );

    // Initialize error handling middleware (should be the last middleware)
    this.app.use(this.errorHandlerMiddleware.handle);
  }

  public start(port: number, environment: string): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port} in ${environment} mode.`);
    });
  }
}

import express, { Application, Router } from "express";
import { LoggerMiddleware } from "@/middlewares/logger.middleware";
import { ErrorHandlerMiddleware } from "@/middlewares/error-handler.middleware";

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

    // Initialize error handling middleware (should be the last middleware)
    this.app.use(this.errorHandlerMiddleware.handle);
  }

  public start(port: number, environment: string): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port} in ${environment} mode.`);
    });
  }
}

import express, { Application, Router } from "express";

export class App {
  private app: Application;

  constructor(private routes: { path: string; router: Router }[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  public start(port: number, environment: string): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port} in ${environment} mode.`);
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }
}

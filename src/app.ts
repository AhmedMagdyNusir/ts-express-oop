import express, { Application } from "express";
import userRoutes from "@/users/user.routes";

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port} in ${process.env.ENVIRONMENT} mode.`);
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use("/users", userRoutes);
  }
}

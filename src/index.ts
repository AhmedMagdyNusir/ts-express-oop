import { App } from "@/app";
import { Config } from "@/utils/config";
import { createUserRoutes } from "@/users/user.routes";
import { LoggerMiddleware } from "@/middlewares/logger.middleware";
import { ErrorHandlerMiddleware } from "@/middlewares/error-handler.middleware";

const envConfig = new Config();

const PORT = envConfig.require("PORT");
const ENVIRONMENT = envConfig.require("ENVIRONMENT");

const routes = [{ path: "/users", router: createUserRoutes() }];
const loggerMiddleware = new LoggerMiddleware();
const errorHandlerMiddleware = new ErrorHandlerMiddleware(envConfig.isDevelopmentMode);

const appInstance = new App(routes, loggerMiddleware, errorHandlerMiddleware);

appInstance.start(Number(PORT), ENVIRONMENT);

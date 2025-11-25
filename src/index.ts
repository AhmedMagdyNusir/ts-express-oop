import { App } from "@/app";
import { config } from "@/utils/config";
import { createUserRoutes } from "@/modules/users/user.routes";
import { LoggerMiddleware } from "@/middlewares/logger.middleware";
import { ErrorHandlerMiddleware } from "@/middlewares/error-handler.middleware";

const routes = [{ path: "/users", router: createUserRoutes() }];

const loggerMiddleware = new LoggerMiddleware();
const errorHandlerMiddleware = new ErrorHandlerMiddleware();

const appInstance = new App(routes, loggerMiddleware, errorHandlerMiddleware);

const PORT = config.require("PORT");
const ENVIRONMENT = config.require("ENVIRONMENT");

appInstance.start(Number(PORT), ENVIRONMENT);

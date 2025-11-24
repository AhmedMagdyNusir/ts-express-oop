import loadEnvironmentVariables from "@/utils/load-env-vars";

loadEnvironmentVariables();

import { App } from "@/app";
import { createUserRoutes } from "@/users/user.routes";
import { LoggerMiddleware } from "@/middlewares/logger.middleware";
import { PORT, ENVIRONMENT } from "@/utils/constants";

if (!PORT) throw new Error("PORT is not defined in environment variables.");
if (!ENVIRONMENT) throw new Error("ENVIRONMENT is not defined in environment variables.");

const routes = [{ path: "/users", router: createUserRoutes() }];
const loggerMiddleware = new LoggerMiddleware();

const appInstance = new App(routes, loggerMiddleware);

appInstance.start(Number(PORT), ENVIRONMENT);

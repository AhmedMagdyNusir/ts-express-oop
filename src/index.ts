import { App } from "./app";
import { createUserRoutes } from "@/users/user.routes";

const PORT = 3000;

const routes = [{ path: "/users", router: createUserRoutes() }];

const appInstance = new App(routes);

appInstance.start(PORT);

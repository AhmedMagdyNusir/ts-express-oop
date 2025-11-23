import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

export const createUserRoutes = (): Router => {
  const router = Router();
  const userService = new UserService();
  const userController = new UserController(userService);

  router.post("/", userController.createUser);
  router.get("/", userController.getUsers);
  router.get("/:id", userController.getUserById);
  router.put("/:id", userController.updateUser);
  router.delete("/:id", userController.deleteUser);

  return router;
};

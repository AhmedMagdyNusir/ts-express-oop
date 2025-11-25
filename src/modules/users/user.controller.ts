import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { ApiError } from "@/utils/api-error";

export class UserController {
  constructor(private userService: UserService) {}

  createUser = (req: Request, res: Response): void => {
    const { name, email } = req.body;
    const user = this.userService.create(name, email);
    res.status(201).json(user);
  };

  getUsers = (req: Request, res: Response): void => {
    const users = this.userService.list();
    res.json(users);
  };

  getUser = (req: Request, res: Response, next: NextFunction): void => {
    const id = parseInt(req.params.id);
    const user = this.userService.get(id);
    if (!user) return next(new ApiError(404, "User not found."));
    res.json(user);
  };

  updateUser = (req: Request, res: Response, next: NextFunction): void => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = this.userService.update(id, name, email);
    if (!user) return next(new ApiError(404, "User not found."));
    res.json(user);
  };

  deleteUser = (req: Request, res: Response, next: NextFunction): void => {
    const id = parseInt(req.params.id);
    const success = this.userService.delete(id);
    if (!success) return next(new ApiError(404, "User not found."));
    res.status(204).send();
  };
}

import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private userService: UserService) {}

  createUser = (req: Request, res: Response): void => {
    const { name, email } = req.body;
    const user = this.userService.create(name, email);
    res.status(201).json(user);
  };

  getUsers = (req: Request, res: Response): void => {
    const users = this.userService.getAll();
    res.json(users);
  };

  getUserById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const user = this.userService.getById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  };

  updateUser = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = this.userService.update(id, name, email);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  };

  deleteUser = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const success = this.userService.delete(id);

    if (!success) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(204).send();
  };
}

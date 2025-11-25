import { User } from "./user.model";

export class UserService {
  private users: User[] = [];
  private nextId: number = 1;

  create(name: string, email: string): User {
    const user: User = { id: this.nextId++, name, email };
    this.users.push(user);
    return user;
  }

  list(): User[] {
    return this.users;
  }

  get(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, name: string, email: string): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;
    user.name = name;
    user.email = email;
    return user;
  }

  delete(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

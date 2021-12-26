import { ICreateUsersDTO } from "./../../../dtos/ICreateUserDTO";
import { User } from "../../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[]

  constructor() {
    this.users = []
  }
  async create({ name, password, email, driver_license }: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { name, password, email, driver_license });

    this.users.push(user);

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }
  
  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }

}

export { UsersRepositoryInMemory };
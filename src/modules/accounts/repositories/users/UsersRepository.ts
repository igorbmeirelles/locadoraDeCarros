import { User } from "../../entities/User";
import { IUsersRepository } from "./IUsersRepository";
import { Repository, getRepository } from "typeorm";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, driver_license, password }: ICreateUsersDTO): Promise<User> {
    const user = this.repository.create({ name, email, driver_license, password });

    await this.repository.save(user);

    return user
  }

  findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }


}

export { UsersRepository };
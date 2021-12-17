import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  driver_license: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  private usersRepository: IUsersRepository;
  constructor(@inject("UsersRepository") usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, password, email, driver_license }: IRequest): Promise<User> {
    return await this.usersRepository.create({ name, password, email, driver_license });
  }
}

export { CreateUserUseCase };
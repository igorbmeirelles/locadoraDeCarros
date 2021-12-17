import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { hash } from "bcryptjs";

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
    const passwordHash = await this.passwordHash(password);
    return await this.usersRepository.create({ name, password: passwordHash, email, driver_license });
  }

  async passwordHash(password: string): Promise<string> {
    return await hash(password, 8);
  }
}

export { CreateUserUseCase };
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

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

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const user = await this.usersRepository.create({ name, password: passwordHash, email, driver_license });
    
    return user
  }

  async passwordHash(password: string): Promise<string> {
    return await hash(password, 8);
  }
}

export { CreateUserUseCase };
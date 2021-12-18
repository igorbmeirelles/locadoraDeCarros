import { compare } from "bcryptjs";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  }
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  private usersRepository: IUsersRepository
  constructor(@inject("UsersRepository") usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError("Email or password incorrect");
    }

    const token = this.generateToken(user.id);

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }

  generateToken(userId: string): string {
    return sign({}, "2bb33ad06ad2a6fe6c4b4eb862f08605", {
      subject: userId,
      expiresIn: "1d"
    })
  }

}

export { AuthenticateUserUseCase };
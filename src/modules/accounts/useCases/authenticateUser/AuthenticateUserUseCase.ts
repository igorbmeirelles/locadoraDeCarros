import { compare } from "bcryptjs";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokenRepository } from "../../repositories/token/IUsersTokenRepository";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";

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
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  private usersRepository: IUsersRepository
  private usersTokenRepository: IUsersTokenRepository
  private dayjsDateProvider: IDateProvider
  constructor(
    @inject("UsersRepository") usersRepository: IUsersRepository,
    @inject("UsersTokenRepository") usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider") dayjsDateProvider: IDateProvider
  ) {
    this.usersRepository = usersRepository;
    this.usersTokenRepository = usersTokenRepository;
    this.dayjsDateProvider = dayjsDateProvider;
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

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token
    })

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token
    })

    const expires_date = this.dayjsDateProvider.addDays(auth.expires_refresh_token_days);

    await this.usersTokenRepository.create({ expires_date, refresh_token, user_id: user.id })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    }
  }

}

export { AuthenticateUserUseCase };
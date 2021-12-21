import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokenRepository } from "../../repositories/token/IUsersTokenRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordUserUseCase {
  private usersTokenRepository: IUsersTokenRepository
  private dateProvider: IDateProvider
  private usersRepository: IUsersRepository
  constructor(
    @inject("UsersTokenRepository") usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider") dateProvider: IDateProvider,
    @inject("UsersRepository") usersRepository: IUsersRepository
  ) {
    this.usersTokenRepository = usersTokenRepository
    this.dateProvider = dateProvider
    this.usersRepository = usersRepository
  }

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByRefreshToken(token)

    if(!userToken) {
      throw new AppError("Token invalid")
    }

    if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError("Token expired")
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)

    await this.usersTokenRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUserUseCase };
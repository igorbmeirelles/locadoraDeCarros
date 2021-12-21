import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokenRepository } from "../../repositories/token/IUsersTokenRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { v4 as uuid } from "uuid";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";

@injectable()
class SendForgotPasswordMailUseCase {
  private usersRepository: IUsersRepository
  private usersTokenRepository: IUsersTokenRepository
  private dateProvider: IDateProvider
  constructor(
    @inject("UsersRepository") usersRepository: IUsersRepository,
    @inject("UsersTokenRepository") usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider") dateProvider: IDateProvider
  ) {
    this.usersRepository = usersRepository
    this.usersTokenRepository = usersTokenRepository
    this.dateProvider = dateProvider
  }
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User does not exists")
    }

    const token = uuid()
    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    })
  }
}

export { SendForgotPasswordMailUseCase };

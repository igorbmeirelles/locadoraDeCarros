import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/dateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersTokenRepository } from '../../repositories/token/IUsersTokenRepository';

interface IRequest {
  refresh_token: string;
}

interface IPayload {
  sub: string;
  email: string;
}
interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  private userTokenRepository: IUsersTokenRepository
  private dayjsDateProvider: IDateProvider
  constructor(
    @inject("UsersTokenRepository") userTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider") dayjsDateProvider: IDateProvider
  ) {
    this.userTokenRepository = userTokenRepository;
    this.dayjsDateProvider = dayjsDateProvider;
  }
  async execute({ refresh_token }: IRequest): Promise<ITokenResponse> {
    const decode = verify(refresh_token, auth.secret_refresh_token) as IPayload;

    if (!decode) {
      throw new AppError('Invalid token');
    }

    const { sub: user_id, email } = decode

    const userTokens = await this.userTokenRepository.findByUserIdAndRefreshToken(user_id, refresh_token);

    if (!userTokens) {
      throw new AppError("Refresh token not found", 401);
    }

    await this.userTokenRepository.deleteById(userTokens.id);

    const expires_date = this.dayjsDateProvider.addDays(auth.expires_refresh_token_days);

    const refresh_token_new = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    })

    const user_token = await this.userTokenRepository.create({ expires_date, user_id, refresh_token: refresh_token_new });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })

    return { 
      token: newToken,
      refresh_token: user_token.refresh_token
    };
  }
}

export { RefreshTokenUseCase };
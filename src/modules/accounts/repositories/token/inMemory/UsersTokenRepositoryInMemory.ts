import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../../../infra/typeorm/entities/UserTokens";
import { IUsersTokenRepository } from "../IUsersTokenRepository";


class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  private repository: UserTokens[]
  constructor() {
    this.repository = []
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { expires_date, refresh_token, user_id });

    this.repository.push(userToken);

    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return this.repository.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token);
  }
  
  async deleteById(id: string): Promise<void> {
    this.repository = this.repository.filter(userToken => userToken.id !== id);
  }
  
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.repository.find(userToken => userToken.refresh_token === refresh_token);
  }
  
}

export { UsersTokenRepositoryInMemory };
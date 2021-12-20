import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "../../../../dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "../../../../repositories/token/IUsersTokenRepository";
import { UserTokens } from "../../entities/UserTokens";


class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserTokens>;
  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await this.repository.create({ expires_date, refresh_token, user_id });

    await this.repository.save(userToken);

    return userToken;
  }

}

export { UsersTokenRepository };
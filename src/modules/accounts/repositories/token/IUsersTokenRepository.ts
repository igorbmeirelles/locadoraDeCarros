import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserTokens";


interface IUsersTokenRepository {
  create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>
}

export { IUsersTokenRepository };
import { User } from "../infra/typeorm/entities/User";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { instanceToInstance } from "class-transformer";
class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };

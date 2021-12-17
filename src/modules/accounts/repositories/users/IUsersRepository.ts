import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";



interface IUsersRepository {
  create({ name, username, password, email, driver_license }: ICreateUsersDTO): Promise<User>;
  findByUsername(username: string): Promise<User>;
}

export { IUsersRepository };

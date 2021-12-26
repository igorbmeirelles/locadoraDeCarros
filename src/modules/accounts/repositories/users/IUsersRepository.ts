import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";



interface IUsersRepository {
  create({ name, password, email, driver_license }: ICreateUsersDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };

import { AppError } from "../../../../errors/AppError";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/users/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  })

  it("Should be able to authenticate a user", async () => {
    const user: ICreateUsersDTO = {
      name: "Test",
      password: "123456",
      email: "email@email.com",
      driver_license: "123456789"
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password })

    expect(result).toHaveProperty("token")
  })

  it("Should not be able to authenticate a inexistent user", () => {
    expect(async () => {
      authenticateUserUseCase.execute({ email: "", password: "" })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUsersDTO = {
        name: "Test",
        password: "password",
        email: "email@test.com",
        driver_license: "23412341"
      }

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({email: user.email, password: "wrongPassword"})
    })
  })

  
})
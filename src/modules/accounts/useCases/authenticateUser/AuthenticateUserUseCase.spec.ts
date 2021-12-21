import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { UsersTokenRepositoryInMemory } from "../../repositories/token/inMemory/UsersTokenRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repositories/users/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepository: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, usersTokenRepositoryInMemory, dateProvider);
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

  it("Should not be able to authenticate a inexistent user", async () => {
    let expectedError
    try {
      await authenticateUserUseCase.execute({ email: "", password: "" })
    }catch(err) {
      expectedError = err
    }
    expect(expectedError).toEqual(new AppError("Email or password incorrect"))
  })

  it("Should not be able to authenticate with incorrect password", async () => {
    let expectedError

    const user: ICreateUsersDTO = {
      name: "Test",
      password: "password",
      email: "email@test.com",
      driver_license: "23412341"
    }

    await createUserUseCase.execute(user);
    
    try {
      await authenticateUserUseCase.execute({email: user.email, password: "wrongPassword"})
    }catch(err) {
      expectedError = err
    }

    expect(expectedError).toEqual(new AppError("Email or password incorrect"))
  })

  
})
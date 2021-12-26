import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/mailProvider/inMemory/MailProviderInMemory";
import { UsersTokenRepositoryInMemory } from "../../repositories/token/inMemory/UsersTokenRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repositories/users/inMemory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory
let usersTokenRepositoryInMememory: UsersTokenRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory

describe('Send forgot mail', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMememory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokenRepositoryInMememory,
      dateProvider,
      mailProvider
    );
  })
  it('Should be able to send a forgot password mail to user', async () => {
    const sendmail = jest.spyOn(mailProvider, 'sendMail')
    const user = await userRepositoryInMemory.create({
      name: 'John Doe',
      driver_license: '1234',
      email: "email@email.com",
      password: "password",
    })

    expect(user).toHaveProperty('id')

    await sendForgotPasswordMailUseCase.execute(user.email)
    expect(sendmail).toHaveBeenCalled()
  });
})

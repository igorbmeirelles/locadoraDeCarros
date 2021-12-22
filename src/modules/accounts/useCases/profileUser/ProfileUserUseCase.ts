import { inject, injectable } from "tsyringe";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { UserMap } from "../../mapper/UserMap";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

@injectable()
class ProfileUserUseCase {
  private userRepository: IUsersRepository;

  constructor(@inject("UsersRepository") userRepository: IUsersRepository) {
    this.userRepository = userRepository;
  }
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };

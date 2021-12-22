import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { IStorageProvider } from "../../../../shared/container/providers/storageProvider/IStorageProvider";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  private userRepository: IUsersRepository;
  private storageProvider: IStorageProvider;
  constructor(
    @inject("UsersRepository") userRepository: IUsersRepository,
    @inject("StorageProvider") storageProvider: IStorageProvider
  ) {
    this.userRepository = userRepository;
    this.storageProvider = storageProvider;
  }

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatar_file, "avatar");

    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };

import { ISpecificationsRepository } from "../../repositories/specifications/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationsUseCase {
  private specificationsRepository: ISpecificationsRepository

  constructor(specificationsRepository: ISpecificationsRepository) {
    this.specificationsRepository = specificationsRepository;
  }

  async execute({name, description}: IRequest): Promise<void> {

    const alreadyExists = await this.specificationsRepository.findByName(name)

    if (alreadyExists) {
      throw new Error("Specification already exists");
    }
    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationsUseCase }
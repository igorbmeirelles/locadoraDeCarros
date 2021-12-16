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

  execute({name, description}: IRequest): void {

    const alreadyExists = this.specificationsRepository.findByName(name)

    if (alreadyExists) {
      throw new Error("Specification already exists");
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationsUseCase }
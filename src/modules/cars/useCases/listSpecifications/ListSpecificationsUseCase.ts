import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/specifications/ISpecificationsRepository";

class ListSpecificationsUseCase {
  private specificationsRepository: ISpecificationsRepository;
  constructor(specificationsRepository: ISpecificationsRepository) {
    this.specificationsRepository = specificationsRepository;
  }

  async execute(): Promise<Specification[]> {
    const list = await this.specificationsRepository.list();
    return list;
  }
}

export { ListSpecificationsUseCase };
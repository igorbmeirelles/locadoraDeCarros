import { ISpecificationsRepository } from "../../repositories/specifications/ISpecificationsRepository";
import { SpecificationsRepository } from "../../repositories/specifications/SpecificationsRepository";

class ListSpecificationsUseCase {
  private specificationsRepository: ISpecificationsRepository;
  constructor(specificationsRepository: ISpecificationsRepository) {
    this.specificationsRepository = specificationsRepository;
  }

  execute() {
    const list = this.specificationsRepository.list();
    return list;
  }
}

export { ListSpecificationsUseCase };
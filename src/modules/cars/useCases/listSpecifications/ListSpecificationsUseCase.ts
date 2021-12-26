import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/entities/Specification";
import { ISpecificationsRepository } from "../../repositories/specifications/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
  private specificationsRepository: ISpecificationsRepository;
  constructor(@inject("SpecificationsRepository") specificationsRepository: ISpecificationsRepository) {
    this.specificationsRepository = specificationsRepository;
  }

  async execute(): Promise<Specification[]> {
    const list = await this.specificationsRepository.list();
    return list;
  }
}

export { ListSpecificationsUseCase };
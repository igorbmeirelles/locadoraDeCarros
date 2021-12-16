import { Specification } from "../../entities/Specification";
import { ICreateSpecificationsRepositoryDTO } from "./ISpecificationsRepository";

class SpecificationsRepository {
  private SpecificationsRepository: Specification[]

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.SpecificationsRepository = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }
  create({ name, description }: ICreateSpecificationsRepositoryDTO): void {
    const SpecificationsRepository: Specification = new Specification()

    Object.assign(SpecificationsRepository, { name, description, created_at: new Date() })

    this.SpecificationsRepository.push(SpecificationsRepository);
  }

  list(): Specification[] {
    return this.SpecificationsRepository;
  }

  findByName(name: string): Specification | undefined {
    return this.SpecificationsRepository.find(SpecificationsRepository => SpecificationsRepository.name === name)
  }
}

export { SpecificationsRepository }
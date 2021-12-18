import { Specification } from "../../../infra/entities/Specification";
import { ISpecificationsRepositoryDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private repository: Specification[];
  constructor() {
    this.repository = [];
  }

  async create({ name, description }: ISpecificationsRepositoryDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, { name, description })

    this.repository.push(specification);
  }

  async list(): Promise<Specification[]> {
    const list = this.repository;
    return list;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.find(specification => specification.name === name);
    return specification;
  }
}

export { SpecificationsRepositoryInMemory };

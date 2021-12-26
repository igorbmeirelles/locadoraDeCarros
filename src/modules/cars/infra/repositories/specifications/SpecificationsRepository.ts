import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepositoryDTO, ISpecificationsRepository } from "../../../repositories/specifications/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification);
  }
  
  async create({ name, description }: ISpecificationsRepositoryDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }

  async list(): Promise<Specification[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<Specification> | undefined {
    return await this.repository.findOne({name})
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.repository.findByIds(ids);
    return specifications;
  }
}

export { SpecificationsRepository }
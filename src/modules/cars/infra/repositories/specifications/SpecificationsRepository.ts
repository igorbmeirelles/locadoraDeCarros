import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepositoryDTO, ISpecificationsRepository } from "../../../repositories/specifications/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  // private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.repository = getRepository(Specification);
  }

  // public static getInstance(): SpecificationsRepository {
  //   if (!SpecificationsRepository.INSTANCE) {
  //     SpecificationsRepository.INSTANCE = new SpecificationsRepository();
  //   }

  //   return SpecificationsRepository.INSTANCE;
  // }
  async create({ name, description }: ISpecificationsRepositoryDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<Specification> | undefined {
    return await this.repository.findOne({name})
  }
}

export { SpecificationsRepository }
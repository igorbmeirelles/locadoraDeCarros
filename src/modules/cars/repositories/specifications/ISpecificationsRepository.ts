import { Specification } from "../../infra/entities/Specification"

interface ISpecificationsRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ISpecificationsRepositoryDTO): Promise<Specification>
  list(): Promise<Specification[]>
  findByName(name: string): Promise<Specification> | undefined
  findByIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificationsRepository, ISpecificationsRepositoryDTO }
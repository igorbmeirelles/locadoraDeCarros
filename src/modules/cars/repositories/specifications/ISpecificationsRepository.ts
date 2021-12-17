import { Specification } from "../../entities/Specification"

interface ICreateSpecificationsRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationsRepositoryDTO): Promise<void>
  list(): Promise<Specification[]>
  findByName(name: string): Promise<Specification> | undefined
}

export { ISpecificationsRepository, ICreateSpecificationsRepositoryDTO }
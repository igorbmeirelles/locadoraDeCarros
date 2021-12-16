import { Specification } from "../../entities/Specification"

interface ICreateSpecificationsRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationsRepositoryDTO): void
  list(): Specification[]
  findByName(name: string): Specification | undefined
}

export { ISpecificationsRepository, ICreateSpecificationsRepositoryDTO }
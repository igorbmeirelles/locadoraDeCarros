import { AppError } from "../../../../shared/errors/AppError";
import { SpecificationsRepositoryInMemory } from "../../repositories/specifications/inMemory/SpecificationRepositoryInMemory";
import { ISpecificationsRepositoryDTO } from "../../repositories/specifications/ISpecificationsRepository";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

let specificationsRepository: SpecificationsRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationsUseCase;

describe('Create specification', () => {
  beforeEach(() => {
    specificationsRepository = new SpecificationsRepositoryInMemory()
    createSpecificationUseCase = new CreateSpecificationsUseCase(specificationsRepository)
  })

  it('Should be able to create a new category', async () => {
    const specification: ISpecificationsRepositoryDTO = {
      name: "Test",
      description: "Description test"
    }

    await createSpecificationUseCase.execute(specification)

    const result = await specificationsRepository.findByName(specification.name)

    expect(result).toHaveProperty("id")

  });

  it('Should not be able to create a duplicate user', () => {
    expect(async () => {
      const specification: ISpecificationsRepositoryDTO = {
        name: "Test",
        description: "Description test"
      }

      await createSpecificationUseCase.execute(specification)
      await createSpecificationUseCase.execute(specification)

    }).rejects.toBeInstanceOf(AppError)
  });

})

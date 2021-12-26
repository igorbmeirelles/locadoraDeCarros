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

  it('Should be able to create a new specification', async () => {
    const specification: ISpecificationsRepositoryDTO = {
      name: "Test",
      description: "Description test"
    }

    await createSpecificationUseCase.execute(specification)

    const result = await specificationsRepository.findByName(specification.name)

    expect(result).toHaveProperty("id")

  });

  it('Should not be able to create a duplicate specification', async () => {
    let expectedError

    const specification: ISpecificationsRepositoryDTO = {
      name: "Test",
      description: "Description test"
    }

    await createSpecificationUseCase.execute(specification)

    try {
      await createSpecificationUseCase.execute(specification)

    } catch (err) {
      expectedError = err
    }

    expect(expectedError).toEqual(new AppError("Specification already exists"))
  });

})

import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/cars/inMemory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory
describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
  })

  it('Should be able to create a car specification', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test car 1",
      description: "description",
      daily_rate: 2,
      license_plate: "abc123",
      fine_amount: 4,
      brand: "Fiat",
      category_id: "category_id",
    })

    const specifications_id = ["1234", "mock_id"]

    await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id })
  });

  it('Should not be able to create a car specification of a non existent car', () => {
    expect(async () => {
      const car_id = "mock_id"
      const specifications_id = ["1234", "mock_id"]
      
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  });
})

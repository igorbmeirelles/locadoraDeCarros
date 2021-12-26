import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/cars/inMemory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/specifications/inMemory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  })

  it('Should be able to create a car specification', async () => {
    const specifications = await specificationsRepositoryInMemory.create({
      name: '4x4',
      description: '4x4'
    })

    const car = await carsRepositoryInMemory.create({
      name: "Test car 1",
      description: "description",
      daily_rate: 2,
      license_plate: "abc123",
      fine_amount: 4,
      brand: "Fiat",
      category_id: "category_id",
    })

    await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id: [specifications.id] })

    const savedCar = await carsRepositoryInMemory.findById(car.id)

    expect(savedCar).toHaveProperty("specifications")
    expect(savedCar.specifications.length).toBe(1)
    expect(savedCar.specifications).toHaveLength(1)
    expect(savedCar.specifications[0]).toHaveProperty("id")

  });

  it('Should not be able to create a car specification of a non existent car', async () => {
    const car_id = "mock_id"
    const specifications_id = ["1234", "mock_id"]

    let expectedError
    try {
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })

    } catch (err) {
      expectedError = err
    }
    
    expect(expectedError).toEqual(new AppError("Car does not exists"))
  });
})

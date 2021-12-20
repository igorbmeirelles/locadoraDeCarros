import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/cars/inMemory/CarsRepositoryInMemory';
import { CreateCarsUseCase } from './CreateCarsUseCase';

let createCarsRepositoryInMemory: CarsRepositoryInMemory;
let createCarsUseCase: CreateCarsUseCase

describe('Create car', () => {
  beforeEach(() => {
    createCarsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarsUseCase = new CreateCarsUseCase(createCarsRepositoryInMemory)
  })

  it('Should be able to create a new car', async () => {
    const car = {
      name: "Test",
      description: "description",
      daily_rate: 2,
      license_plate: "abc123",
      fine_amount: 4,
      brand: "Fiat",
      category_id: "category_id",
    }
    const carSaved = await createCarsUseCase.execute(car)

    await createCarsRepositoryInMemory.findByLicensePlate(car.license_plate)

    expect(carSaved).toHaveProperty("id")
  });

  it('Should not be able to create a car with a existent license plate', async () => {
    const car1 = {
      name: "Test car 1",
      description: "description",
      daily_rate: 2,
      license_plate: "abc123",
      fine_amount: 4,
      brand: "Fiat",
      category_id: "category_id",
    }
    const car2 = {
      name: "Test car 2",
      description: "description",
      daily_rate: 2,
      license_plate: "abc123",
      fine_amount: 4,
      brand: "Fiat",
      category_id: "category_id",
    }

    await createCarsUseCase.execute(car1)

    let expectedError 

    try {
      await createCarsUseCase.execute(car2)
    }catch(err) {

      expectedError = err
    }

    expect(expectedError).toEqual(new AppError("Car already exists"))
  });

  it('Should be able to create a car with available as true by default', async () => {
    const car = {
      name: "Test car 1",
      description: "description",
      daily_rate: 2,
      license_plate: "abc123",
      fine_amount: 4,
      brand: "Fiat",
      category_id: "category_id",
    }

    const carSaved = await createCarsUseCase.execute(car)

    expect(carSaved.available).toBe(true)

  });

})

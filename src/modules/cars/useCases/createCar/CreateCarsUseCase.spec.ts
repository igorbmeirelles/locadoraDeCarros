import { CarsRepositoryInMemory } from '../../repositories/cars/inMemory/CarsRepositoryInMemory';
import { CreateCarsUseCase } from './CreateCarsUseCase';

let createCarsRepositoryInMemory: CarsRepositoryInMemory;
let createCarsUseCase: CreateCarsUseCase

describe('Create car', () => {
  beforeEach(() => {
    createCarsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarsUseCase = new CreateCarsUseCase(createCarsRepositoryInMemory)
  })

  it('Should be able to create a new car', () => {
    createCarsUseCase.execute({
      name: "Test",
      description: "description",
      daily_rate: 2,
      license_plate: "abc123",
      fine_amount: 4,
      brand: "Fiat",
      category_id: "category_id",
    })
  });
})

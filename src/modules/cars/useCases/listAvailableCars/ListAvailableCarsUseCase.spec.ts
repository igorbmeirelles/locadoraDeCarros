import { CarsRepositoryInMemory } from "../../repositories/cars/inMemory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository)
  })

  it('Should be able to list all avaliable cars', async () => {
    const car = await carsRepository.create({
      "name": "Test car",
      "description": "test description",
      "daily_rate": 200,
      "license_plate": "ade234",
      "fine_amount": 40,
      "brand": "VeryGood",
      "category_id": "2a733659-b883-409e-9f3d-c02fe06b9979"
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
    expect(cars).toHaveLength(1)
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepository.create({
      "name": "TestByName",
      "description": "test description",
      "daily_rate": 200,
      "license_plate": "ade234",
      "fine_amount": 40,
      "brand": "VeryGood",
      "category_id": "2a733659-b883-409e-9f3d-c02fe06b9979"
    })

    const cars = await listAvailableCarsUseCase.execute({ name: "Mockar" })

    expect(cars).toHaveLength(2)
  });

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepository.create({
      "name": "TestByName",
      "description": "test description",
      "daily_rate": 200,
      "license_plate": "ade234",
      "fine_amount": 40,
      "brand": "VeryGood",
      "category_id": "2a733659-b883-409e-9f3d-c02fe06b9979"
    })

    const cars = await listAvailableCarsUseCase.execute({ category_id: "2a733659-b883-409e-9f3d-c02fe06b9979" })

    expect(cars).toEqual([car])
    expect(cars).toHaveLength(1)
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepository.create({
      "name": "TestByName",
      "description": "test description",
      "daily_rate": 200,
      "license_plate": "ade234",
      "fine_amount": 40,
      "brand": "VeryGood",
      "category_id": "2a733659-b883-409e-9f3d-c02fe06b9979"
    })

    const cars = await listAvailableCarsUseCase.execute({ brand: "VeryGood" })

    expect(cars).toHaveLength(2)
  });

})

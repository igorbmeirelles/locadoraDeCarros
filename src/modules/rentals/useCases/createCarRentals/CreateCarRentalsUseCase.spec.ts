import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repository/inMemory/RentalsRepositoryInMemory";
import { CreateCarRentalsUseCase } from "./CreateCarRentalsUseCase";
import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/DayjsDateProvider"
import dayjs from "dayjs"
import { CarsRepositoryInMemory } from "../../../cars/repositories/cars/inMemory/CarsRepositoryInMemory";
import { ICarsRepository } from "../../../cars/repositories/cars/ICarsRepository";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { IRentalsRepository } from "../../repository/IRentalsRepository";

let createCarRentalsUseCase: CreateCarRentalsUseCase
let rentalsRepositoryInMemory: IRentalsRepository
let dayjsDateProvider: IDateProvider
let carsRepositoryInMemory: ICarsRepository

describe('Create car rental', () => {
  const day24HoursLater = dayjs().add(24, 'hour').toDate()
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()

    createCarRentalsUseCase = new CreateCarRentalsUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    )

  })

  it('Should be able to create a car rental', async () => {
    let car = await carsRepositoryInMemory.create({
      category_id: "test",
      brand: "test",
      name: "test",
      license_plate: "test",
      daily_rate: 10,
      description: "test",
      fine_amount: 10,
    })

    expect(car.available).toBe(true)

    const rental = await createCarRentalsUseCase.execute({
      car_id: car.id,
      user_id: '123',
      expected_return_date: dayjs().add(24, 'hour').toDate(),
    })

    car = await carsRepositoryInMemory.findById(car.id)

    expect(car.available).toBe(false)
    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  });

  it('Should not be able to create a car rental when a user already has one rental open', async () => {
    let expectedError
    let car1 = await carsRepositoryInMemory.create({
      category_id: "test",
      brand: "test",
      name: "test",
      license_plate: "test",
      daily_rate: 10,
      description: "test",
      fine_amount: 10,
    })

    let car2 = await carsRepositoryInMemory.create({
      category_id: "test",
      brand: "test",
      name: "test",
      license_plate: "test",
      daily_rate: 10,
      description: "test",
      fine_amount: 10,
    })

    expect(car1.available).toBe(true)
    expect(car2.available).toBe(true)

    await createCarRentalsUseCase.execute({
      car_id: car1.id,
      user_id: '123',
      expected_return_date: dayjs().add(24, 'hour').toDate(),
    })

    try {
      await createCarRentalsUseCase.execute({
        car_id: car2.id,
        user_id: '123',
        expected_return_date: dayjs().add(24, 'hour').toDate(),
      })

    } catch (err) {
      expectedError = err
    }

    expect(expectedError).toEqual(new AppError('User already has rental in progress'))
  });

  it('Should not be able to create a car rental when a car is already rented', async () => {
    let expectedError

    let car = await carsRepositoryInMemory.create({
      category_id: "test",
      brand: "test",
      name: "test",
      license_plate: "test",
      daily_rate: 10,
      description: "test",
      fine_amount: 10,
    })

    expect(car.available).toBe(true)

    await createCarRentalsUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: day24HoursLater,
    })

    try {
      await createCarRentalsUseCase.execute({
        car_id: car.id,
        user_id: '123',
        expected_return_date: new Date(),
      })
    } catch (err) {
      expectedError = err
    }
    expect(expectedError).toEqual(new AppError('Car unavailable'))
  });

  it('Should not be able to rent a car with less then 24 hours of rental time', async () => {
    let expectedError
    
    let car = await carsRepositoryInMemory.create({
      category_id: "test",
      brand: "test",
      name: "test",
      license_plate: "test",
      daily_rate: 10,
      description: "test",
      fine_amount: 10,
    })

    try {
      await createCarRentalsUseCase.execute({
        car_id: car.id,
        user_id: '12345',
        expected_return_date: new Date(),
      })
    } catch (err) {
      expectedError = err
    }
    expect(expectedError).toEqual(new AppError("Expected return date must be at least 24 hours from now"))
  });

})

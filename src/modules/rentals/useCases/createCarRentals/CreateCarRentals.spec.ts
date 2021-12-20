import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repository/inMemory/RentalsRepositoryInMemory";
import { CreateCarRentalsUseCase } from "./CreateCarRentalsUseCase";
import { DayjsDateProvider } from "./../../../../shared/container/providers/dateProvider/DayjsDateProvider"
import dayjs from "dayjs"

let createCarRentalsUseCase
let rentalsRepositoryInMemory
let dayjsDateProvider

describe('Create car rental', () => {
  const day24HoursLater = dayjs().add(24, 'hour').toDate()
  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()

    createCarRentalsUseCase = new CreateCarRentalsUseCase(rentalsRepositoryInMemory, dayjsDateProvider)
  })

  it('Should be able to create a car rental', async () => {
    const rental = await createCarRentalsUseCase.execute({
      car_id: '123',
      user_id: '123',
      expected_return_date: day24HoursLater,
    })
    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  });

  it('Should not be able to create a car rental when a user already has one rental open', async () => {
    expect(async () => {
      await createCarRentalsUseCase.execute({
        car_id: '123',
        user_id: '123',
        expected_return_date: day24HoursLater,
      })

      await createCarRentalsUseCase.execute({
        car_id: '123',
        user_id: '123',
        expected_return_date: day24HoursLater,
      })
    }).rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to create a car rental when a car is already rented', async () => {
    expect(async () => {
      await createCarRentalsUseCase.execute({
        car_id: '123',
        user_id: '12345',
        expected_return_date: day24HoursLater,
      })

      await createCarRentalsUseCase.execute({
        car_id: '123',
        user_id: '123',
        expected_return_date: new Date(),
      })
    }).rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to rent a car with less then 24 hours of rental time', () => {
    expect(async () => {
      await createCarRentalsUseCase.execute({
        car_id: '123',
        user_id: '12345',
        expected_return_date: new Date(),
      })
    }).rejects.toBeInstanceOf(AppError)
  });

})

import { RentalsRepositoryInMemory } from "../../repository/inMemory/RentalsRepositoryInMemory";
import { CreateCarRentalsUseCase } from "./CreateCarRentalsUseCase";


let createCarRentalsUseCase
let rentalsRepositoryInMemory

describe('Create car rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createCarRentalsUseCase = new CreateCarRentalsUseCase(rentalsRepositoryInMemory)
  })

  it('Should be able to create a car rental', async () => {
    const rental = await createCarRentalsUseCase.execute({
      car_id: '123',
      user_id: '123',
      expected_return_date: new Date(),
    })
    expect(rental).toHaveProperty('id')
  });
})

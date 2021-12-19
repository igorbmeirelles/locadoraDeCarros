import { IRentalsDTO } from "../../dtos/IRentalsDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";


class RentalsRepositoryInMemory implements IRentalsRepository{
  private rentals: Rental[]
  constructor() {
    this.rentals = []
  }
  async create({ car_id, user_id, end_date, expected_return_date, total }: IRentalsDTO): Promise<Rental> {
    const rental = new Rental()
    Object.assign(rental, {
      car_id, 
      user_id, 
      start_date: new Date(),
      end_date,
      expected_return_date,
      total
    })

    this.rentals.push(rental)
    
    return rental
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }
}

export { RentalsRepositoryInMemory };
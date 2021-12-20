import { getRepository, Repository } from "typeorm";
import { IRentalsDTO } from "../../../dtos/IRentalsDTO";
import { IRentalsRepository } from "../../../repository/IRentalsRepository";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>
  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({ id, user_id, car_id, expected_return_date, total, end_date }: IRentalsDTO): Promise<Rental> {
    const rental = this.repository.create({ id, user_id, car_id, expected_return_date, total, end_date });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.repository.findOne({ where: { car_id, end_date: null } });
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.repository.findOne({ where: { user_id, end_date: null } });
    return rental;
  }

  findById(id: string): Promise<Rental> {
    const rental = this.repository.findOne(id);

    return rental
  }

  findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.repository.find({ where: { user_id }, relations: ['car'] });
    return rentals;
  }

}

export { RentalsRepository };
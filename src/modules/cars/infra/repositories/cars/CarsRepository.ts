import { getRepository, Repository } from "typeorm";
import { ICarDTO } from "../../../dto/ICarDTO";
import { ICarsRepository } from "../../../repositories/cars/ICarsRepository";
import { Car } from "../../entities/Car";


class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>
  constructor() {
    this.repository = getRepository(Car)
  }

  async create({ name, description, license_plate, brand, daily_rate, fine_amount, category_id }: ICarDTO): Promise<Car> {
    const car = this.repository.create({ name, description, license_plate, brand, daily_rate, fine_amount, category_id })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = this.repository.findOne({ license_plate: licensePlate })
    return car
  }

}

export { CarsRepository };
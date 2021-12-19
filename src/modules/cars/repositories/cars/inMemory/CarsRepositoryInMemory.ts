import { ICarDTO } from "../../../dto/ICarDTO";
import { Car } from "../../../infra/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[]
  constructor() {
    this.cars = []
  }

  async create({ name, description, daily_rate, license_plate, fine_amount, category_id, brand }: ICarDTO): Promise<void> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand
    })

    this.cars.push(car)
  }
}

export { CarsRepositoryInMemory };
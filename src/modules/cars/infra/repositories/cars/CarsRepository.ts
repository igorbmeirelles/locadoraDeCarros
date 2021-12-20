import { getRepository, Repository } from "typeorm";
import { ICarDTO } from "../../../dto/ICarDTO";
import { ICarsRepository } from "../../../repositories/cars/ICarsRepository";
import { Car } from "../../entities/Car";


class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>
  constructor() {
    this.repository = getRepository(Car)
  }

  async create({ id, name, description, license_plate, brand, daily_rate, fine_amount, category_id, specifications }: ICarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      license_plate,
      brand, daily_rate,
      fine_amount,
      category_id,
      specifications
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = this.repository.findOne({ license_plate: licensePlate })
    return car
  }

  async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true })

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand })
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name })
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id)
    return car
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const car = await this.repository
    .createQueryBuilder()
    .update()
    .set({available})
    .where("id = :id")
    .setParameters({id})
    .execute()
  }

}

export { CarsRepository };
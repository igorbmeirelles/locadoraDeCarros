import { ICarDTO } from "../../../dto/ICarDTO";
import { Car } from "../../../infra/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[]
  constructor() {
    this.cars = [
      {
        id: "2a733659-b883-409e-9f3d-c02fe06b9979",
        name: "Mockar",
        description: "test mock",
        daily_rate: 200,
        license_plate: "ade234",
        available: false,
        fine_amount: 40,
        brand: "VeryGood",
        category_id: "id_mock",
        specifications: [{
          id: "mockId",
          name: "mock_specification",
          description: "mock_description",
          created_at: new Date().toString()
        }],
        created_at: new Date()
      }
    ]
  }

  async create({ id, name, description, daily_rate, license_plate, fine_amount, category_id, brand, specifications }: ICarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      category_id,
      brand,
      specifications
    })

    this.cars.push(car)
    return car
  }

  async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
    return this.cars.filter(
      car => car.available ||
        ((brand && car.brand === brand) ||
          (name && car.name === name) ||
          (category_id && car.category_id === category_id))
    )
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = this.cars.find(car => car.license_plate === licensePlate)
    return car
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find(car => car.id === id)
    return car
  }
}

export { CarsRepositoryInMemory };
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/entities/Car";
import { ICarsRepository } from "../../repositories/cars/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarsUseCase {
  private carsRepository: ICarsRepository
  constructor(@inject("CarsRepository") carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository
  }

  async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate)

    if (carAlreadyExists) {
      throw new AppError("Car already exists")
    }

    const car = await this.carsRepository.create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id })
    return car
  }
}

export { CreateCarsUseCase };
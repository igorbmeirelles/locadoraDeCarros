import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../repositories/cars/ICarsRepository";
import { Car } from "../../infra/entities/Car";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}
@injectable()
class ListAvailableCarsUseCase {
  private carsRepository: ICarsRepository
  constructor(@inject("CarsRepository") carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository
  }

  async execute({category_id, brand, name}: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(category_id, brand, name)
    return cars
  }
}

export { ListAvailableCarsUseCase };
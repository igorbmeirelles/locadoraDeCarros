import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/entities/Car";
import { ICarsRepository } from "../../repositories/cars/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/specifications/ISpecificationsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  private carsRepository: ICarsRepository
  private specificationsRepository: ISpecificationsRepository

  constructor(@inject("CarsRepository") carsRepository: ICarsRepository, @inject("SpecificationsRepository") specificationsRepository: ISpecificationsRepository) {
    this.carsRepository = carsRepository
    this.specificationsRepository = specificationsRepository
  }
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const existentCar = await this.carsRepository.findById(car_id)

    if (!existentCar) {
      throw new AppError("Car does not exists")
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id)

    if (!specifications) {
      throw new AppError("Specifications does not exists")
    }

    existentCar.specifications = specifications

    const savedCar = await this.carsRepository.create(existentCar)

    return savedCar
  }
}

export { CreateCarSpecificationUseCase };
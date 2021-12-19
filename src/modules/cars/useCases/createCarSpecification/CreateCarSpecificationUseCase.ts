import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/cars/ICarsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  private carsRepository: ICarsRepository
  constructor(@inject("CarsRepository") carsRepository: ICarsRepository) {
    this.carsRepository = carsRepository
  }
  async execute({car_id, specifications_id}: IRequest): Promise<void> {
    const carAlreadyExists = this.carsRepository.findById(car_id)

    if(!carAlreadyExists) {
      throw new AppError("Car does not exists")
    }


  }
}

export { CreateCarSpecificationUseCase };
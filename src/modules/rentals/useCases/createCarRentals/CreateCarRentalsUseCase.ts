import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repository/IRentalsRepository";

interface IRequest {
  car_id: string;
  user_id: string;
  end_date?: Date;
  expected_return_date: Date;
  total?: number;
}

class CreateCarRentalsUseCase {
  private rentalsRepository: IRentalsRepository;
  constructor(rentalsRepository: IRentalsRepository) {
    this.rentalsRepository = rentalsRepository
  }

  async execute({ car_id, user_id, end_date, expected_return_date, total }: IRequest): Promise<Rental> {
    const carUnavailable = this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError('Car unavailable');
    }

    const userAlreadyHasRental = this.rentalsRepository.findOpenRentalByUser(user_id);

    if (userAlreadyHasRental) {
      throw new AppError('User already has rental in progress');
    }
    
    const rental = await this.rentalsRepository.create({car_id, user_id, end_date})
    return rental
  }
}

export { CreateCarRentalsUseCase };
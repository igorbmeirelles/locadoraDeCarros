import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/cars/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repository/IRentalsRepository";


interface IRequest {
  car_id: string;
  user_id: string;
  end_date?: Date;
  expected_return_date: Date;
  total?: number;
}

@injectable()
class CreateCarRentalsUseCase {
  private readonly minimumRentalHours: number = 24;
  private dateProvider: IDateProvider
  private rentalsRepository: IRentalsRepository;
  private carsRepository: ICarsRepository;

  constructor(
    @inject("RentalsRepository") rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider") dateProvider: IDateProvider,
    @inject("CarsRepository") carsRepository: ICarsRepository
  ) {
    this.dateProvider = dateProvider;
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
  }

  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError('Car unavailable');
    }

    const userAlreadyHasRental = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (userAlreadyHasRental) {
      throw new AppError('User already has rental in progress');
    }

    const dateNow = this.dateProvider.dateNow();
    const compareDate = this.dateProvider.compareInHours(dateNow, expected_return_date);


    if (compareDate < this.minimumRentalHours) {
      throw new AppError('Expected return date must be at least 24 hours from now');
    }

    const rental = await this.rentalsRepository.create({ car_id, user_id, expected_return_date })

    this.carsRepository.updateAvailable(car_id, false);

    return rental
  }
}

export { CreateCarRentalsUseCase };
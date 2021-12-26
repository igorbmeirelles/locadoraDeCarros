import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/cars/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repository/IRentalsRepository";

interface IRequest {
  rental_id: string;
  user_id
}

@injectable()
class ReturnRentalUseCase {
  private readonly minimumDaily = 1
  private rentalsRepository: IRentalsRepository;
  private carsRepository: ICarsRepository;
  private dateProvider: IDateProvider;

  constructor(
    @inject("RentalsRepository")
    rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    dateProvider: IDateProvider
  ) {
    this.rentalsRepository = rentalsRepository
    this.carsRepository = carsRepository
    this.dateProvider = dateProvider
  }
  async execute({ rental_id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id)
    const car = await this.carsRepository.findById(rental.car_id)

    if (!rental) {
      throw new AppError('Rental not found')
    }

    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow)

    if (daily <= 0) {
      daily = this.minimumDaily
    }

    const delay = this.dateProvider.compareInDays(rental.expected_return_date, dateNow)

    let total = 0

    if (delay > 0) {
      const calculate_fine = daily * car.fine_amount
      total = calculate_fine
    }

    total += daily * car.daily_rate

    rental.end_date = dateNow
    rental.total = total

    await this.carsRepository.updateAvailable(rental.car_id, true)

    const updatedRental = await this.rentalsRepository.create(rental)

    return updatedRental
  }

}

export { ReturnRentalUseCase };
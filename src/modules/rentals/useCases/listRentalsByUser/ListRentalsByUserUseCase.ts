import { inject, injectable } from "tsyringe";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repository/IRentalsRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalsByUserUseCase {
  private rentalsRepository: IRentalsRepository
  constructor(@inject("RentalsRepository") rentalsRepository: IRentalsRepository) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);

    return rentals;
  }
}

export { ListRentalsByUserUseCase };
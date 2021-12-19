import { IRentalsDTO } from "../dtos/IRentalsDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create(date: IRentalsDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
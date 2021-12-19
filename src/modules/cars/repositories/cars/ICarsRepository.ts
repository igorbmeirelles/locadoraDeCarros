import { ICarDTO } from "../../dto/ICarDTO";
import { Car } from "../../infra/entities/Car";

interface IAvailableOptions {
  category_id?: string;
  brand?: string;
  name?: string;
}
interface ICarsRepository {
  create(car: ICarDTO): Promise<Car>;
  findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
}

export { ICarsRepository };
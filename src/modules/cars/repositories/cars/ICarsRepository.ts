import { ICarDTO } from "../../dto/ICarDTO";
import { Car } from "../../infra/entities/Car";

interface ICarsRepository {
  create(car: ICarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
}

export { ICarsRepository };
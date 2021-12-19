import { ICarDTO } from "../../dto/ICarDTO";

interface ICarsRepository {
  create(car: ICarDTO): Promise<void>;
}

export { ICarsRepository };
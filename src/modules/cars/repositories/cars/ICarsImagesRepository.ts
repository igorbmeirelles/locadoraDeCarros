import { ICarImageDTO } from "../../dto/ICarImageDTO";
import { CarImage } from "../../infra/entities/CarImage";


interface ICarsImagesRepository {
  create({car_id, image_name}: ICarImageDTO): Promise<CarImage>
}

export { ICarsImagesRepository };
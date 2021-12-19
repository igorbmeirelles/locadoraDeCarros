import { getRepository, Repository } from "typeorm";
import { ICarImageDTO } from "../../../dto/ICarImageDTO";
import { ICarsImagesRepository } from "../../../repositories/cars/ICarsImagesRepository";
import { CarImage } from "../../entities/CarImage";


class CarsImagesRepository implements ICarsImagesRepository{
  private repository: Repository<CarImage>
  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });
    
    await this.repository.save(carImage);
    
    return carImage
  }
  
}

export { CarsImagesRepository };
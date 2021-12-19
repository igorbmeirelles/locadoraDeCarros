import { inject, injectable } from "tsyringe";
import { ICarsImagesRepository } from "../../repositories/cars/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  private carsImageRepository: ICarsImagesRepository
  constructor(@inject("CarsImagesRepository") carsImageRepository: ICarsImagesRepository) {
    this.carsImageRepository = carsImageRepository
  }

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    
    images_name.map(async (image_name) => {
      await this.carsImageRepository.create({ car_id, image_name })
    })

  }
}

export { UploadCarImagesUseCase };
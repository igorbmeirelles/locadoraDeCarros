import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/storageProvider/IStorageProvider";
import { ICarsImagesRepository } from "../../repositories/cars/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  private carsImageRepository: ICarsImagesRepository;
  private storageProvider: IStorageProvider;
  constructor(
    @inject("CarsImagesRepository") carsImageRepository: ICarsImagesRepository,
    @inject("StorageProvider") storageProvider: IStorageProvider
  ) {
    this.carsImageRepository = carsImageRepository;
    this.storageProvider = storageProvider;
  }

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carsImageRepository.create({ car_id, image_name });
      await this.storageProvider.save(image_name, "cars");
    });
  }
}

export { UploadCarImagesUseCase };

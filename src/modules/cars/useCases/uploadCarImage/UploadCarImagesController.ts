import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}
class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    console.log(typeof car_id)
    const images = req.files as unknown as IFiles[];

    const images_name = images.map(file => file.filename)

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase)

    await uploadCarImageUseCase.execute({ car_id, images_name })

    return res.status(201).json({ message: "Car images uploaded" })
  }
}

export { UploadCarImagesController };
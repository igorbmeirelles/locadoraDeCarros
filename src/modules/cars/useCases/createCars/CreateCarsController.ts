import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarsUseCase } from "./CreateCarsUseCase";

class CreateCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, daily_rate, license_plate, fine_amount, brand, category_id } = req.body

    const createCarUseCase = container.resolve(CreateCarsUseCase);

    const car = await createCarUseCase.execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id })
    
    return res.status(201).json(car)
  }
}

export { CreateCarsController };
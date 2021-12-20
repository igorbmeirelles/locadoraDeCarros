import { Request, Response } from "express";
import { CreateCarRentalsUseCase } from "./CreateCarRentalsUseCase";
import { container } from "tsyringe";

class CreateCarRentalsController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, expected_return_date } = req.body;
    const { id } = req.user

    const createCarRentalsUseCase = container.resolve(CreateCarRentalsUseCase);
    
    const rental = await createCarRentalsUseCase.execute({ car_id, user_id: id, expected_return_date })

    return res.status(201).json(rental)
  }
}

export { CreateCarRentalsController };
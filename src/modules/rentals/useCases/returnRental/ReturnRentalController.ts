import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReturnRentalUseCase } from "./ReturnRentalUseCase";


class ReturnRentalController {
  async handle(req: Request, res: Response) {
    const { id: user_id } = req.user;
    const { id: rental_id } = req.params;

    const returnRentalUseCase = container.resolve(ReturnRentalUseCase);

    const rental = await returnRentalUseCase.execute({ rental_id, user_id });

    return res.status(201).json(rental);
  }
}

export { ReturnRentalController };
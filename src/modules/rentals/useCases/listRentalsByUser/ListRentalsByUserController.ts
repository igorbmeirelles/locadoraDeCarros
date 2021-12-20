import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";


class ListRentalsByUserController {
  async handle(req: Request, res: Response) {
    const { id: user_id } = req.user;

    const listRentalsUseCase = container.resolve(ListRentalsByUserUseCase);

    const rentals = await listRentalsUseCase.execute({ user_id });
    
    return res.status(201).json(rentals);
  }
}

export { ListRentalsByUserController };
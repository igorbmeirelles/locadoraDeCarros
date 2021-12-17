import { Request, Response } from "express";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";
import { container } from "tsyringe"

class CreateSpecificationsController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSpecificationsUseCase = container.resolve(CreateSpecificationsUseCase);
    try {
      await createSpecificationsUseCase.execute({ name, description });

      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error."
      });
    }
  }
}

export { CreateSpecificationsController };
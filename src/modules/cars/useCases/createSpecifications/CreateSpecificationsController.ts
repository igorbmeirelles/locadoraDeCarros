import { Request, Response } from "express";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";


class CreateSpecificationsController {
  private createSpecificationsUseCase: CreateSpecificationsUseCase;
  constructor(createSpecificationsUseCase: CreateSpecificationsUseCase) {
    this.createSpecificationsUseCase = createSpecificationsUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    // const specificationsService = new CreateSpecificationsUseCase(specificationsRepository);
    try {
      await this.createSpecificationsUseCase.execute({ name, description });

      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({
        message: err.message || "Unexpected error."
      });
    }
  }
}

export { CreateSpecificationsController };
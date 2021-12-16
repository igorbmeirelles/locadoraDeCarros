import { Request, Response } from "express";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";


class CreateSpecificationsController {
  private createSpecificationsUseCase: CreateSpecificationsUseCase;
  constructor(createSpecificationsUseCase: CreateSpecificationsUseCase) {
    this.createSpecificationsUseCase = createSpecificationsUseCase
  }

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    // const specificationsService = new CreateSpecificationsUseCase(specificationsRepository);

    this.createSpecificationsUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateSpecificationsController };
import { Request, Response } from "express-serve-static-core";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { container } from "tsyringe";

class ListSpecificationsController {

  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);
    const list = await listSpecificationsUseCase.execute();

    return res.status(200).json(list);
  }
}

export { ListSpecificationsController };
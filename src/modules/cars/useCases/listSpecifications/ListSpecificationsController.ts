import { Request, Response } from "express-serve-static-core";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  private listSpecificationsUseCase: ListSpecificationsUseCase;
  constructor(listSpecificationsUseCase: ListSpecificationsUseCase){
    this.listSpecificationsUseCase = listSpecificationsUseCase;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const list = await this.listSpecificationsUseCase.execute();
    return res.status(200).json(list);
  }
}

export { ListSpecificationsController };
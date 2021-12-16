import { Request, Response } from "express-serve-static-core";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
  private listSpecificationsUseCase: ListSpecificationsUseCase;
  constructor(listSpecificationsUseCase: ListSpecificationsUseCase){
    this.listSpecificationsUseCase = listSpecificationsUseCase;
  }

  handle(req: Request, res: Response): Response {
    const list = this.listSpecificationsUseCase.execute();
    return res.status(200).json(list);
  }
}

export { ListSpecificationsController };
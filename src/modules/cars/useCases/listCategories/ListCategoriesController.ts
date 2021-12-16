import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  private listCategoriesUseCase: ListCategoriesUseCase;

  constructor(listCategoriesUseCase: ListCategoriesUseCase) {
    this.listCategoriesUseCase = listCategoriesUseCase;
  }

  handle(req: Request, res: Response): Response {
    const list = this.listCategoriesUseCase.execute()

    return res.status(200).json(list);
  }

}

export { ListCategoriesController };
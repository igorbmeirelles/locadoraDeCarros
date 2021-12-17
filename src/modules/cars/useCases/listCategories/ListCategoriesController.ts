import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  private listCategoriesUseCase: ListCategoriesUseCase;

  constructor(listCategoriesUseCase: ListCategoriesUseCase) {
    this.listCategoriesUseCase = listCategoriesUseCase;
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const list = await this.listCategoriesUseCase.execute()

    return res.status(200).json(list);
  }

}

export { ListCategoriesController };
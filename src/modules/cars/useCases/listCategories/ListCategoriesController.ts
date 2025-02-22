import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { container } from "tsyringe"

class ListCategoriesController {

  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const list = await listCategoriesUseCase.execute()
    
    return res.status(200).json(list);
  }

}

export { ListCategoriesController };
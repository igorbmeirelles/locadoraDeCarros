import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";


class ImportCategoryController {
  private importCategoryUseCase: ImportCategoryUseCase
  constructor(importCategoryUseCase: ImportCategoryUseCase) {
    this.importCategoryUseCase = importCategoryUseCase
  }
  handle(req: Request, res: Response): Response {
    const { file } = req
    
    this.importCategoryUseCase.execute(file)

    return res.send(200).send()
  }
}

export { ImportCategoryController }
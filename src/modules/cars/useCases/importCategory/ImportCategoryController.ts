import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { container } from "tsyringe"

class ImportCategoryController {

  handle(req: Request, res: Response): Response {
    const { file } = req

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
    importCategoryUseCase.execute(file)

    return res.status(200).send()
  }
}

export { ImportCategoryController }
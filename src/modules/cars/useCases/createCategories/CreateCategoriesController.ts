import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { container } from "tsyringe"

class CreateCategoryController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase); 

    try {
      
      await createCategoryUseCase.execute({ name, description });
      return res.status(201).send();

    } catch (err) {

      return res.status(400).json({
        message: err.message
      })
      
    }
  }
}

export { CreateCategoryController }
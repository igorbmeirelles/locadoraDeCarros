import { Request, Response } from "express";
import { container } from "tsyringe"
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, password, email, driver_license } = req.body;
    
    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute({ name, password, email, driver_license });

      return res.send(201).json({ message: "User created" });

    } catch (err) {
      return res.status(400).json({ message: err.message || "Unexpected error" });
    }

  }
}

export { CreateUserController };
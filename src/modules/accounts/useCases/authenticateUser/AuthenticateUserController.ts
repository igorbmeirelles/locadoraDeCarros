import { Request, Response } from "express"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { container } from "tsyringe"

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    const authenticateInfo = await authenticateUserUseCase.execute({ email, password })

    return res.status(200).json(authenticateInfo)
  }
}

export { AuthenticateUserController }
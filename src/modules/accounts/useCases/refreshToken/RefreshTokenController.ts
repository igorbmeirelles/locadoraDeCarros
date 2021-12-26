import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";


class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.body || req.headers['x-access-token'] || req.query;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresh_token = await refreshTokenUseCase.execute({ refresh_token: token });

    return res.status(201).json(refresh_token)
  }
}

export { RefreshTokenController };
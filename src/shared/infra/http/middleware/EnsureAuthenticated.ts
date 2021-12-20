import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/users/UsersRepository";

interface IPayload {
  sub: string;
}

export async function EnsureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    throw new AppError("Token is missing", 401)
  }

  const [, token] = authorization?.split(" ")

  if (!token) {
    throw new AppError("Token is missing", 401)
  }

  try {
    const { sub: user_id } = verify(token, "2bb33ad06ad2a6fe6c4b4eb862f08605") as unknown as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User not found", 401)
    }

    req.user = { id: user.id }
    next()
  } catch {
    throw new AppError("Token is not valid", 401)
  }
}
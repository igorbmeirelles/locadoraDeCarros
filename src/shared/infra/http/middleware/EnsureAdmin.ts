import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/users/UsersRepository";
import { AppError } from "../../../errors/AppError";

export async function EnsureAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user

  const usersRepository = new UsersRepository()
  const user = await usersRepository.findById(id)

  if (!user.isAdmin) {
    throw new AppError("User is not admin", 401)
  }

  next()
}
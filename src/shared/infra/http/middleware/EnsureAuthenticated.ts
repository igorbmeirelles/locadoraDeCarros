import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/users/UsersRepository";
import { UsersTokenRepository } from "../../../../modules/accounts/infra/typeorm/repositories/token/UsersTokenRepository";
import auth from "../../../../config/auth";

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
    const { sub: user_id } = verify(token, auth.secret_token) as unknown as IPayload

    req.user = { id: user_id }
    next()
  } catch {
    throw new AppError("Token is not valid", 401)
  }
}
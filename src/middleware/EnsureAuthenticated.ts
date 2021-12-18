import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/users/UsersRepository";

interface IPayload {
  sub: string;
}

export async function EnsureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({mesage: "Token not provided"})
  }

  const [, token] = authorization?.split(" ")

  if (!token) {
    return res.status(401).json({mesage: "Token not provided"})
  }
  try {
    const { sub } = verify(token, "2bb33ad06ad2a6fe6c4b4eb862f08605") as unknown as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(sub)

    if (!user) {
      return res.status(401).json({mesage: "User not found"})
    }

    next()
  } catch {
    
    return res.status(401).json({mesage: "Invalid token"})
  }
}
import "reflect-metadata";

import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import { router } from "./routes"

import "./database"
import "./shared/container"
import { AppError } from "./errors/AppError";

const app = express();

app.use(express.json())
app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }
  return res.status(500).json({ message: err.message })
})

app.listen(3000, () => console.log("Server is running"));

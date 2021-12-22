import "reflect-metadata";
import "dotenv/config";

import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import { router } from "./shared/infra/http/routes";
import createConnection from "./shared/infra/typeorm";

import "./shared/container";

import { AppError } from "./shared/errors/AppError";

const app = express();

createConnection();

app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  return res.status(500).json({ message: err.message });
});

export { app };

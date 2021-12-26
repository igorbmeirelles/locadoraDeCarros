import "reflect-metadata";
import "dotenv/config";

import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import { router } from "./shared/infra/http/routes";
import createConnection from "./shared/infra/typeorm";
import cors from "cors";
import rateLimiter from "./shared/infra/http/middleware/RateLimiter";
import "./shared/container";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import { AppError } from "./shared/errors/AppError";
import upload from "./config/upload";

createConnection();
const app = express();

app.use(rateLimiter)

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());

app.use(router);

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(Sentry.Handlers.errorHandler());

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

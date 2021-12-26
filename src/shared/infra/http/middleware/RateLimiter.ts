import redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

export default async function rateLimeiter(
  req: Request,
  res: Response,
  next: NextFunction
) {}

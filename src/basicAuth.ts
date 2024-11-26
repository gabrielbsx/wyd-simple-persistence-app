import { NextFunction, Request, Response } from "express";
import { env } from "./env";

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = Buffer.from(
    `${env.BASIC_AUTH_USERNAME}:${env.BASIC_AUTH_PASSWORD}`
  ).toString("base64");

  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== `Basic ${auth}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

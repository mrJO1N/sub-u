import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/API.error";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    res.status(err.status).send({ error: err.message });
  } else {
    res.status(500).send({ error: "Internal Server Error" });
    console.error(err);
  }
}

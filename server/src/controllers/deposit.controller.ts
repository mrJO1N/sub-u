import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { logAllRight } from "../utils/logger";
import { ApiError } from "../errors/API.error";
import { models } from "../db/models";

class UsersController {
  async deposit(req: Request, res: Response, next: NextFunction) {
    res.send("hello");
    logAllRight(req.url);
  }
}

export default new UsersController();

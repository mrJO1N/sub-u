import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { ApiError } from "../errors/API.error";
import { models, repos } from "../db/models";
import { UserI } from "../types";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";

const generateJwt = (userId: number, email: string, role: string) =>
  jwt.sign({ id: userId, email, role }, JWT_SECRET, {
    expiresIn: "24h",
  });

class UsersController {
  async login(req: Request, res: Response, next: NextFunction) {
    const {
      email,
      password,
    }: { email: string; password: string; name: string } = req.body;

    const user = await repos.User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(ApiError.badRequest("Invalid email or password"));
    }

    if (!user.emailIsVerified) {
      return next(ApiError.forBidden("Email not verified"));
    }

    const token = generateJwt(user.id, email, user.role);
    res.json({ token });
  }

  async reg(req: Request, res: Response, next: NextFunction) {
    const { email, password, name } = req.body;

    const candidate = await repos.User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("this email is already in use"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new models.User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await repos.User.save(user);

    const token = generateJwt(user.id, email, user.role);
    res.json({ token });
  }
}

export default new UsersController();

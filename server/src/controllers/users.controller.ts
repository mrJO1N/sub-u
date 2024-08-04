import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { ApiError } from "../errors/API.error";
import { models } from "../db/models";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";

const generateJwt = (userId: number, email: string, role: string) =>
  jwt.sign({ id: userId, email, role }, JWT_SECRET, {
    expiresIn: "24h",
  });

class UsersController {
  async reg(req: Request, res: Response, next: NextFunction) {
    const { email, password, name } = req.body;

    const candidate = await models.User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("this email is already in use"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await models.User.create({
      email,
      password: hashedPassword,
      name,
      role: "USER",
      balance: 0,
      // emailIsVerified: false,
    });

    if (!user) return next(ApiError.internal("registration failed"));

    const userFields = user.dataValues;
    const token = generateJwt(userFields.id, email, userFields.role);
    res.json({ token });
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await models.User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.badRequest("Invalid email or password"));
    }
    const userFields = user.dataValues;

    if (!(await bcrypt.compare(password, userFields.password))) {
      return next(ApiError.badRequest("Invalid email or password"));
    }

    // if (!userFields.emailIsVerified) {
    //   return next(ApiError.forBidden("Email not verified"));
    // }

    const token = generateJwt(userFields.id, email, userFields.role);
    res.json({ token });
  }

  async getJWT(req: Request, res: Response, next: NextFunction) {}
}

export default new UsersController();

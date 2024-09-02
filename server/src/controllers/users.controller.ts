import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import logger, { logAllRight } from "../utils/logger.js";
import { ApiError } from "../errors/API.error.js";
import { models } from "../db/models.js";
// import { emitter } from "../events/user.events";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";

const generateJwt = ({ id, email, role }: generateJwtOptions) =>
  jwt.sign({ id, email, role }, JWT_SECRET, {
    expiresIn: "24h",
  });

class UsersController {
  async reg(req: CustomRequest, res: Response, next: NextFunction) {
    const { email, password, name, specPassword } = req.body;

    if (specPassword) {
      const candidate = await models.User.findOne({ where: { name } });
      if (candidate) {
        return next(ApiError.badRequest("this bot name is already in use"));
      }
      const hashedPassword = await bcrypt.hash(specPassword, 10);

      const user = await models.User.create({
        email: "",
        password: hashedPassword,
        name,
        role: "BOT",
        balance: 10_000,
        // emailIsVerified: false,
      });

      if (!user) return next(ApiError.internal("registration failed"));

      const userFields = user.dataValues;
      const token = generateJwt({
        id: userFields.id,
        role: userFields.role,
      });

      logAllRight(req.url);
      res.json({ token });
    } else if (email && password) {
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
        balance: 100,
        // emailIsVerified: false,
      });

      if (!user) return next(ApiError.internal("registration failed"));

      const userFields = user.dataValues;
      const token = generateJwt({
        id: userFields.id,
        email,
        role: userFields.role,
      });

      logAllRight(req.url);
      res.json({ token });
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const { name, password }: { name: string; password: string } = req.body;

    const user = await models.User.findOne({ where: { name } });

    if (!user) {
      return next(ApiError.badRequest("Invalid name"));
    }
    const userFields = user.dataValues;

    if (!user || !(await bcrypt.compare(password, userFields.password))) {
      return next(ApiError.badRequest("Invalid email or password"));
    }

    // if (!userFields.emailIsVerified) {
    //   return next(ApiError.forBidden("Email not verified"));
    // }

    const token = generateJwt({
      id: userFields.id,
      email: userFields.email,
      role: userFields.role,
    });
    logAllRight(req.url);
    res.json({ token });
  }

  // async getJWT(req: Request, res: Response, next: NextFunction) {}
  async getBalanceSubscription(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // emitter.on("changeBalane",())
    const userId = req.body.__JWT_user.id;
    const user = await models.User.findByPk(userId);
    if (!user) {
      return next(ApiError.badRequest("User not found"));
    }

    res.json({ balance: user.dataValues.balance });
  }
  async getBalance(req: CustomRequest, res: Response, next: NextFunction) {
    const userId = req.body.__JWT_user.id;
    const user = await models.User.findByPk(userId);
    if (!user) {
      return next(ApiError.badRequest("User not found"));
    }

    logAllRight(req.url);
    res.json({ balance: user.dataValues.balance });
  }
  async patchOne(req: CustomRequest, res: Response, next: NextFunction) {
    const userId = req.body.__JWT_user.id;
    const { name, email, password } = req.body;

    const fieldsToUpdate = Object.fromEntries(
      Object.entries({ name, email, password }).filter(
        ([key, val]) => val !== undefined
      )
    );
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fieldsToUpdate.password = hashedPassword;
    }

    if (Object.keys(fieldsToUpdate).length <= 0)
      return next(ApiError.badRequest("missing fields to update"));

    const [updatedCount] = await models.User.update(fieldsToUpdate, {
      where: { id: userId },
    });

    if (!updatedCount)
      return next(ApiError.badRequest("User not found or not updated"));

    res.send();
    logAllRight(req.url);
  }
  async deleteOne(req: CustomRequest, res: Response, next: NextFunction) {
    const userId = req.body.__JWT_user.id;

    const destroyRes = await models.User.destroy({ where: { id: userId } });

    if (!destroyRes) return next(ApiError.badRequest("user not found"));

    res.send();
    logAllRight(req.url);
  }
}

type generateJwtOptions = { id: number; email?: string; role: string };
interface CustomRequest extends Request {
  body: {
    __JWT_user: {
      id: number;
      email: string;
      role: string;
    };
    email?: string;
    password?: string;
    name: string;
    specPassword?: string;
  };
}

export default new UsersController();

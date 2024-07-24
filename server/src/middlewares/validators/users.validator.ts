import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ApiError } from "../../errors/API.error";

class UsersValidator {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password)
      return next(ApiError.badRequest("missing email or password"));

    const bodyRequired = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = bodyRequired.validate({ email, password });
    if (error) return next(ApiError.badRequest(error.message));

    next();
  }

  async reg(req: Request, res: Response, next: NextFunction) {
    const { email, password, name } = req.body;

    if (!email || !password || !name)
      return next(ApiError.badRequest("missing email, name or password"));

    const bodyRequired = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    });

    const { error } = bodyRequired.validate({ email, password, name });
    if (error) return next(ApiError.badRequest(error.message));

    next();
  }
}

export default new UsersValidator();

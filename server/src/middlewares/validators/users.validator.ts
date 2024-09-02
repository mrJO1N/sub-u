import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ApiError } from "../../errors/API.error";

class UsersValidator {
  async login(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;

    const bodyRequired = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = bodyRequired.validate({ name, password });
    if (error) return next(ApiError.badRequest(error.message));

    next();
  }

  async reg(req: Request, res: Response, next: NextFunction) {
    const { email, password, name, specPassword } = req.body;

    type bodyRequiredT = {
      name: string;
      specPassword?: string;
      email?: string;
      password?: string;
    };

    let bodyRequired: Joi.ObjectSchema<bodyRequiredT>;

    if (specPassword) {
      bodyRequired = Joi.object({
        specPassword: Joi.string(),
        name: Joi.string(),
      });

      const { error } = bodyRequired.validate({ specPassword, name });
      if (error) return next(ApiError.badRequest(error.message));
    } else if (email && password) {
      bodyRequired = Joi.object({
        email: Joi.string().email(),
        password: Joi.string(),
        name: Joi.string(),
      });

      const { error } = bodyRequired.validate({ email, password, name });
      if (error) return next(ApiError.badRequest(error.message));
    } else
      return next(ApiError.badRequest("missing name, or password, or email"));

    next();
  }

  async patchOne(req: Request, res: Response, next: NextFunction) {
    // const { name, password } = req.body;

    // const bodyRequired = Joi.object({
    //   name: Joi.string().required(),
    //   password: Joi.string().required(),
    // });

    // const { error } = bodyRequired.validate({ name, password });
    // if (error) return next(ApiError.badRequest(error.message));

    next();
  }
}

export default new UsersValidator();

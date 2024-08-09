import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ApiError } from "../../errors/API.error";

class TransfersController {
  async makeTo(req: Request, res: Response, next: NextFunction) {
    const { amount, username } = req.body;

    if (!amount || !username)
      return next(ApiError.badRequest("missing amount or username in body"));

    const schema = Joi.object({
      amount: Joi.number().required().min(0),
      username: Joi.string().required().alphanum(),
    });

    const { error } = schema.validate(req.body);
    if (error) return next(ApiError.badRequest(error.details[0].message));

    next();
  }
  async requestQR(req: Request, res: Response, next: NextFunction) {
    const { amount } = req.body;

    if (!amount) return next(ApiError.badRequest("missing amount in body"));
    const schema = Joi.object({
      amount: Joi.number().required().min(0),
    });

    const { error } = schema.validate({ amount });
    if (error) return next(ApiError.badRequest(error.details[0].message));

    next();
  }

  async runQR(req: Request, res: Response, next: NextFunction) {}
}

export default new TransfersController();

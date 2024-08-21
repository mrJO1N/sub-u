import { Request, Response, NextFunction } from "express";

import { logAllRight } from "../utils/logger";
import transfersController from "./transfers.controller";
import { ApiError } from "../errors/API.error";

class DepositsController {
  async deposit(req: Request, res: Response, next: NextFunction) {
    const { body, ...newReq } = req;

    if (body.__user.role !== "BOT")
      return next(ApiError.badRequest("tg bot only"));

    const newBody = { amount: 10, username: body.toUser, __user: body.__user };

    transfersController.makeTo(
      { body: newBody, ...newReq } as Request,
      res,
      next
    );
    logAllRight(req.url);
  }
}

export default new DepositsController();

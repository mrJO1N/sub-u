import { Request, Response, NextFunction } from "express";
import { generateQRToken } from "../utils/QRTokens";
import conn from "../db/conn";
import { ApiError } from "../errors/API.error";
import { models } from "../db/models";

class TransfersController {
  async makeTo(req: Request, res: Response, next: NextFunction) {
    const { amount, username }: { amount: number; username: string } = req.body;

    const fromUser = await models.User.findByPk(req.body.__user.id);
    if (!fromUser) return next(ApiError.internal("invalid user id"));

    const toUser = await models.User.findOne({
      where: { name: username },
    });
    if (!toUser) {
      throw ApiError.badRequest("User not found");
    }

    const transaction = await conn.transaction();

    await models.User.update(
      { balance: fromUser.dataValues.balance - amount },
      { where: { id: fromUser.dataValues.id }, transaction }
    );
    await models.User.update(
      { balance: toUser.dataValues.balance + amount },
      { where: { id: toUser.dataValues.id }, transaction }
    );
    await models.Transfer.create(
      {
        fromUserId: fromUser.dataValues.id,
        toUserId: toUser.dataValues.id,
        amount,
      },
      { transaction }
    );

    const result = await transaction.commit();

    res.send(result);
  }
  async requestQR(req: Request, res: Response, next: NextFunction) {
    const { amount } = req.body;

    const toUser = await models.User.findByPk(req.body.__user.id);
    if (!toUser) return next(ApiError.internal("invalid user jwt id"));

    // const l=crypto.scrypt()
    // const tok = await crypto
    //   .createCipheriv("aes-256-gcm", "top secret", "superman")
    //   .toArray()??"";

    // const tok = crypto.Cipher;

    // const enc=crypto.hma

    res.json({ token: generateQRToken(100, "me") });
  }

  async runQR(req: Request, res: Response, next: NextFunction) {}
}

export default new TransfersController();

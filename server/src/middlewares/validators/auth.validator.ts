import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../../utils/logger";

dotenv.config();

type l = { __JWT_user: { id: number }; [key: string]: any };

class AuthValidator {
  checkToken(req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") next();

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      logger.error("auth token not provided");
      return res.status(401).json({ message: "Token not provided" });
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET ?? "";
      const decoded = jwt.verify(token, JWT_SECRET);

      // give decoded to next controller or middleware
      req.body.__JWT_user = decoded;

      next();
    } catch (err) {
      logger.error("auth invalid token");
      return res.status(403).json({ message: "Invalid token" });
    }
  }
}

export default new AuthValidator();

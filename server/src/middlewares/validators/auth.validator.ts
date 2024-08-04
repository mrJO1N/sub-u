import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthValidator {
  checkToken(req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") next();
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    try {
      const JWT_SECRET = process.env.JWT_SECRET ?? "";
      const decoded = jwt.verify(token, JWT_SECRET);

      // give decoded to next controller or middleware
      req.body.__user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  }
}

export default new AuthValidator();

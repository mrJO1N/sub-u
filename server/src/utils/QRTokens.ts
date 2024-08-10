import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const QR_SECRET = process.env.QR_SECRET ?? "mrJO1N";

export const generateQRToken = (amount: number, username: string) =>
  crypto
    .createHmac("sha256", QR_SECRET)
    .update(username + String(amount))
    .digest("base64");

export const scanQRToken = (token: string) => {};

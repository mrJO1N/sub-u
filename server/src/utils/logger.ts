import { transports, format, createLogger } from "winston";
import dotenv from "dotenv";

dotenv.config();

const PATH_TO_LOGS = process.env.PATH_TO_LOGS ?? "../../logs/logs.json";

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss-ms" }),
    format.prettyPrint()
  ),
  transports: [
    // new transports.File({ filename: PATH_TO_LOGS, level: "info" }),
    new transports.Console(),
  ],
  level: "debug",
});

export const logAllRight = (msg?: string) => logger.info(`${msg ?? ""} -> ok`);

export default logger;

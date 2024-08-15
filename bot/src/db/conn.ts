import { Sequelize } from "sequelize";
import { config } from "../services/config/config.service.js";

export default new Sequelize({
  dialect: "postgres",
  database: config.get("DB_NAME") ?? "",
  username: config.get("DB_USER") ?? "",
  password: config.get("DB_PASSWORD") ?? "",
  host: config.get("DB_HOSTNAME") ?? "localhost",
  port: Number(config.get("DB_PORT") ?? 5432),
  logging: false, // Set to true for detailed logging
});

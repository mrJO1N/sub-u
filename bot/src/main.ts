import dotenv from "dotenv";
import logger from "./utils/logger";
import sequelize from "./db/conn";
import ErrorHandler from "./middlewares/ErrorHandler";

dotenv.config();

const PORT = Number(process.env.PORT ?? 80);

async function startServer() {
  await sequelize.sync();
  await sequelize.authenticate();
}

startServer();

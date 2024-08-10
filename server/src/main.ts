import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "./utils/logger";
import routers from "./routers/main.router";
import sequelize from "./db/conn";
import ErrorHandler from "./middlewares/ErrorHandler";

const app = express();
dotenv.config();

const PORT = Number(process.env.PORT ?? 80);
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} -> ${JSON.stringify(req.body)}`);
  next();
});

app.use("/api", routers);
app.use(ErrorHandler);

async function startServer() {
  await sequelize.sync();
  await sequelize.authenticate();

  app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}.http://localhost:${PORT}`)
  );
}

startServer();

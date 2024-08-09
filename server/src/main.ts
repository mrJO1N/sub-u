import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routers from "./routers/main.router";
import sequelize from "./db/conn";
import ErrorHandler from "./middlewares/ErrorHandler";

const app = express();
dotenv.config();

const PORT = Number(process.env.PORT ?? 80);
// HOSTNAME = process.env.PORT ?? "localhost";
app.use(cors());
app.use(express.json());

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

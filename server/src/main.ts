import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routers from "./routers/main.router";

const app = express();
dotenv.config();

const PORT = Number(process.env.PORT ?? 80);
app.use(cors());
app.use(express.json());

app.use("/api", routers);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}.http://localhost:${PORT}`)
);

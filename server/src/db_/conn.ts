import { DataSource } from "typeorm";

const DB_NAME = process.env.DB_NAME ?? "database",
  DB_USER = process.env.DB_USER ?? "postgres",
  DB_PASSWORD = process.env.DB_PASSWORD ?? "",
  DB_PORT = Number(process.env.DB_PORT ?? 5432),
  DB_HOST = process.env.DB_HOST ?? "localhost";

const DB_URL =
  process.env.DB_URL ??
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default new DataSource({
  type: "postgres",
  url: DB_URL,
  port: DB_PORT,
  entities: ["src/db/models/**/*.model.ts"], // Path to entities
  synchronize: true, // Automatically synchronize database schema with entities
});

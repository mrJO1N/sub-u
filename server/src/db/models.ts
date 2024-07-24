import conn from "./conn";
import User from "./models/users.model";

conn.getRepository(User);

export const models = {
  User,
};

export const repos = {
  User: conn.getRepository(User),
};

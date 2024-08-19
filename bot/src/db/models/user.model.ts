import { DataTypes, ModelDefined, Optional } from "sequelize";
import sequelize from "../conn.js";

const User: UserModel = sequelize.define("bot-user", {
  tgId: { type: DataTypes.BIGINT, unique: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true },
});

export type UserModel = ModelDefined<UserAttrI, UserCreationAttrI>;

export interface UserAttrI {
  name: string;
  tgId: number;
}

interface UserCreationAttrI extends Optional<UserAttrI, "tgId"> {
  name: string;
  tgId: number;
}

export default User;

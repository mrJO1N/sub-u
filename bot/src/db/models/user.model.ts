import { DataTypes, ModelDefined, Optional } from "sequelize";
import sequelize from "../conn.js";

const User: ModelDefined<UserAttrI, UserCreationAttrI> = sequelize.define(
  "bot-user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, unique: true },
    tgId: { type: DataTypes.BIGINT, unique: true },
  }
);

interface UserAttrI {
  id: number;
  name: string;
  tgId: number;
}

interface UserCreationAttrI extends Optional<UserAttrI, "id"> {
  name: string;
  tgId: number;
}

export default User;

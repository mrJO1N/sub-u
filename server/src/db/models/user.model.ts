import { DataTypes, ModelDefined, Optional } from "sequelize";
import sequelize from "../conn";

const User: ModelDefined<UserAttrI, UserCreationAttrI> = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      // allowNull: false,
      // unique: true,
    },
    balance: { type: DataTypes.INTEGER, defaultValue: 0, validate: { min: 0 } },
    name: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    // emailIsVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
  }
);

interface UserAttrI {
  id: number;
  balance: number;
  email: string;
  // emailIsVerified: boolean;
  name: string;
  password: string;
  role: string;
}

interface UserCreationAttrI extends Optional<UserAttrI, "id"> {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default User;

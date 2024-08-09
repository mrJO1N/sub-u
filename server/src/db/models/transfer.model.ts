import { DataTypes, ModelDefined, Optional } from "sequelize";
import sequelize from "../conn";

const Transfer: ModelDefined<TransferAttrI, TransferCreationAttrI> =
  sequelize.define("transfer", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fromUserId: { type: DataTypes.INTEGER },
    toUserId: { type: DataTypes.INTEGER },
    amount: { type: DataTypes.INTEGER, validate: { min: 0 } },
  });

interface TransferCreationAttrI extends Optional<TransferAttrI, "id"> {
  fromUserId: number;
  toUserId: number;
  amount: number;
}

interface TransferAttrI {
  id: number;
  fromUserId: number;
  toUserId: number;
  amount: number;
}

export default Transfer;

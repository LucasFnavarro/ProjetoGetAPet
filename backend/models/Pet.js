import { DataTypes } from "sequelize";
import { connection } from "../database/connection.js";

export const Pet = connection.define("Pet", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },

  age: {
    type: DataTypes.INTEGER,
    required: true,
  },

  weight: {
    type: DataTypes.INTEGER,
    required: true,
  },

  color: {
    type: DataTypes.STRING,
    required: true,
  },

  images: {
    type: DataTypes.JSON,
    required: true,
  },

  available: {
    type: DataTypes.BOOLEAN,
    required: true,
  },
});

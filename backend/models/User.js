import { DataTypes, Sequelize } from "sequelize";
import { connection } from "../database/connection.js";

export const User = connection.define("User", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },

  email: {
    type: DataTypes.STRING,
    required: true,
  },

  password: {
    type: DataTypes.STRING,
    required: true,
  },

  confirmpassword: {
    type: DataTypes.STRING,
    required: true,
  },

  confirmpassword: {
    type: DataTypes.STRING,
    required: true,
  },

  image: {
    type: DataTypes.STRING,
    required: true,
  },

  phone: {
    type: DataTypes.STRING,
    required: true,
  },
});

import { Sequelize } from "sequelize";

export const connection = new Sequelize("get_a_pet", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

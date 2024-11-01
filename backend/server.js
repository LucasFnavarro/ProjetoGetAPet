import express from "express";
import cors from "cors";

// import config connection sequelize
import { connection } from "./database/connection.js";

// import models
import { User } from "./models/User.js";
import { Pet } from "./models/Pet.js";

import { UserRoutes } from "./routes/UserRoutes.js";

const app = express();
const PORT = 3333;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http:localhost:3333" }));
app.use(express.static("public"));

app.use("/users", UserRoutes);

connection.sync().then(() => {
  console.log("Conectado com sucesso no Banco de Dados");

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT} 🚀`);
  });
});

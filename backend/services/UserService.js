// src/services/UserService.js
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validarEmail } from "../helpers/validarEmail.js";

export class UserService {
  static async validateUser(userData) {
    const errors = [];
    const { name, email, password, confirmpassword, phone } = userData;

    if (!name) errors.push("É obrigatório fornecer um nome de usuário");
    if (!email) errors.push("É obrigatório fornecer um email");
    if (!validarEmail(email)) errors.push("Forneça um email válido!");
    if (!password) errors.push("É obrigatório fornecer uma password");
    if (!confirmpassword)
      errors.push("É obrigatório preencher a confirmação de password");
    if (password !== confirmpassword)
      errors.push("As senhas não correspondem!");
    if (!phone) errors.push("É obrigatório fornecer um número de telefone");

    if (errors.length > 0) {
      throw { status: 422, message: errors[0] };
    }
  }

  static async createUser(userData) {
    const { name, email, password, image, phone } = userData;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw {
        status: 422,
        message: "E-mail em uso! Por favor, utilize outro e-mail!",
      };
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      image,
      phone,
      password: passwordHash,
      confirmpassword: passwordHash,
    });

    return user.save();
  }

  static async authenticateUser(email, password) {
    if (!email) throw { status: 422, message: "Preencha o campo de e-mail" };
    if (!validarEmail(email))
      throw {
        status: 422,
        message: "E-mail inválido, por favor forneça um e-mail válido!",
      };
    if (!password)
      throw { status: 422, message: "Preencha o campo de password" };

    const user = await User.findOne({ where: { email } });
    if (!user)
      throw {
        status: 422,
        message: "Não existe nenhum usuário com este e-mail",
      };

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      throw { status: 422, message: "Senha inválida, tente novamente!" };

    return user;
  }

  static async findUserById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password", "confirmpassword"] },
    });

    if (!user) throw { status: 422, message: "Usuário não encontrado" };
    return user;
  }
}

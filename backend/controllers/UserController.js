import { validarEmail } from "../helpers/validarEmail.js";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { createUserToken } from "../helpers/create-user-token.js";
import { getToken } from "../helpers/get-token.js";
import jwt from "jsonwebtoken";

export class UserController {
  static async register(req, res) {
    const { name, email, password, confirmpassword, image, phone } = req.body;

    // Validações = Não é a melhor forma de se fazer ...
    if (!name) {
      return res
        .status(422)
        .json({ message: "É obrigatório fornecer um nome de usuário" });
    }

    if (!email) {
      return res
        .status(422)
        .json({ messagE: "É obrigatório fornecer um email" });
    }

    if (!validarEmail(email)) {
      return res.status(422).json({ message: "Forneça um email válido!" });
    }

    if (!password) {
      return res
        .status(422)
        .json({ message: "É obrigatório fornecer uma password" });
    }

    if (!confirmpassword) {
      return res
        .status(422)
        .json({ message: "É obrigatório preencher a confirmação de password" });
    }

    if (password !== confirmpassword) {
      return res.status(422).json({ message: "As senhas não correspondem!" });
    }

    if (!phone) {
      return res
        .status(422)
        .json({ message: "É obrigatório fornecer um número de telefone" });
    }

    const verifyIfUserExists = await User.findOne({ where: { email } });

    if (verifyIfUserExists) {
      return res
        .status(422)
        .json({ message: "E-mail em uso! Por favor, utilize outro e-mail!" });
    }

    const createHashInPassword = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, createHashInPassword);

    const user = new User({
      name: name,
      email: email,
      image: image,
      phone: phone,
      password: passwordHash,
      confirmpassword: passwordHash,
    });

    try {
      const createNewUser = await user.save();
      await createUserToken(createNewUser, req, res);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Preencha o campo de e-mail" });
    }

    if (!validarEmail(email)) {
      return res.status(422).json({
        message: "E-mail inválido, por favor forneça um e-mail válido!",
      });
    }

    if (!password) {
      return res.status(422).json({ message: "Preencha o campo de password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(422)
        .json({ message: "Não existe nenhum usuário com este e-mail" });
    }

    // checa se a senha do login (input) bate com a do BD
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(422)
        .json({ message: "Senha inválida, tente novamente!" });
    }

    await createUserToken(user, req, res);
  }

  static async checkUserViaToken(req, res) {
    let currentUser;

    console.log(currentUser);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(
        token,
        "IBHIHibhBIYUHG8YUG8YgyspababvsabvgY7G7163187631637176guvhvdOVTAStfvoVTCVPGgb"
      );

      currentUser = await User.findByPk(decoded.id);
      currentUser.password = undefined;
    } else {
      currentUser = null;
      res.json({ msg: "teste de validação" });
    }

    res.status(200).json({ currentUser });
  }
}

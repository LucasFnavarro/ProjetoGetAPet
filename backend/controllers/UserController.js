import { UserService } from "../services/UserService.js";
import { createUserToken } from "../helpers/createUserToken.js";
import { getToken } from "../helpers/get-token.js";
import jwt from "jsonwebtoken";
import { TokenService } from '../services/TokenService.js';

export class UserController {
  static async register(req, res) {
    try {
      const userData = req.body;
      
      await UserService.validateUser(userData);
      const newUser = await UserService.createUser(userData);
      await createUserToken(newUser, req, res);

    } catch (error) {
      return res.status(error.status || 500).json({ 
        message: error.message || "Erro interno do servidor" 
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.authenticateUser(email, password);
      await createUserToken(user, req, res);

    } catch (error) {
      return res.status(error.status || 500).json({ 
        message: error.message || "Erro interno do servidor" 
      });
    }
  }

  static async checkUserViaToken(req, res) {
    try {
      let currentUser;
  
      if (req.headers.authorization) {
        const token = getToken(req);
        const decoded = TokenService.verifyToken(token);
        currentUser = await UserService.findUserById(decoded.id);
      } else {
        currentUser = null;
      }
  
      res.status(200).json({ currentUser });
    } catch (error) {
      return res.status(error.status || 500).json({ 
        message: error.message || "Erro interno do servidor" 
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.findUserById(id);
      res.status(200).json({ message: "Usuário encontrado:", user });
    } catch (error) {
      return res.status(error.status || 500).json({ 
        message: error.message || "Erro interno do servidor" 
      });
    }
  }

  static async editUser(req, res) {
    res.status(200).json({ msg: "Deu certo !!!" });
  }
}
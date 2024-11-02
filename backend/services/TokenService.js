import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.js";

export class TokenService {
  static generateToken(payload) {
    return jwt.sign(payload, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, authConfig.secret);
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }
}



////// >> CRIAR AUTHCONFIG NA RAIZ ./config \\\\\\\\
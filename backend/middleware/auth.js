import { TokenService } from '../services/TokenService.js';
import { AuthResponse } from '../helpers/createUserToken.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw { status: 401, message: "Token não fornecido" };
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = TokenService.verifyToken(token);
      req.userId = decoded.id;
      return next();
    } catch (err) {
      throw { status: 401, message: "Token inválido" };
    }
  } catch (error) {
    return res.status(error.status || 500).json(
      AuthResponse.error(error.message)
    );
  }
};
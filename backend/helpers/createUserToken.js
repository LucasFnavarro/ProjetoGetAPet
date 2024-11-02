// helpers/createUserToken.js
import { TokenService } from "../services/TokenService.js";

export class AuthResponse {
  static success(user, token) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      message: "Você foi autenticado com sucesso.",
      token,
    };
  }

  static error(message, status = 401) {
    return {
      status,
      message,
    };
  }
}

export const createUserToken = async (user, req, res) => {
  try {
    const payload = {
      name: user.name,
      id: user.id,
    };

    const token = TokenService.generateToken(payload);
    return res.status(200).json(AuthResponse.success(user, token));
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(AuthResponse.error(error.message || "Erro ao gerar token"));
  }
};

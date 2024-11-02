import jwt from "jsonwebtoken";
import { getToken } from "./get-token.js";

// middleware de validação de token
export const validationToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Acesso negado, tente novamente!" });
  }

  const token = getToken(req);

  if (!token) {
    res.status(401).json({ message: "Acesso negado, tente novamente!" });
  }

  try {
    const verified = jwt.verify(
      token,
      "IBHIHibhBIYUHG8YUG8YgyspababvsabvgY7G7163187631637176guvhvdOVTAStfvoVTCVPGgb"
    );
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token inválido!" });
  }
};

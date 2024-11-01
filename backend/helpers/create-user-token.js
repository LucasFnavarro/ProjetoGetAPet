import jwt from "jsonwebtoken";

export const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    "IBHIHibhBIYUHG8YUG8YgyspababvsabvgY7G7163187631637176guvhvdOVTAStfvoVTCVPGgb"
  );

  res.status(200).json({
    id: user.id,
    message: "Você foi autenticado com sucesso.",
    token: token,
  });
};

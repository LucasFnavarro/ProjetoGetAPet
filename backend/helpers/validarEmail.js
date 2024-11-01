import validator from "validator";

export function validarEmail(email) {
  return validator.isEmail(email);
}

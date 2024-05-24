import * as jwt from "jsonwebtoken";

const makeToken = (idUser: string) => {
  return jwt.sign(idUser, "TP2024ODONTOLOGOPROJECT")
};

export default makeToken;

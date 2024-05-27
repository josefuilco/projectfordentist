import * as jwt from "jsonwebtoken";

const makeToken = (idUser: string) => {
  console.log(`El usuario con id-${idUser} ingreso.`);
  return jwt.sign(idUser, "TP2024ODONTOLOGOPROJECT");
};

export default makeToken;

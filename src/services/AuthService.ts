import User from "../models/User";
import MysqlConnection from "../connection/MysqlConnection";
import UserRepository from "../repositories/UserRepository";
import makeToken from "../utils/makeToken";
import { createTransport } from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const repository = new UserRepository(MysqlConnection.getInstance());

// Servicios para autorizar a los usuarios
export async function authorize(currentEmail: string, currentPassword: string) {
  const { id, password }: any = await repository.findByEmail(currentEmail);
  if (password == currentPassword) {
    const token = makeToken(id);
    return token;
  } else {
    throw "Usuario → No autenticado.";
  }
}

// Servicio para registrar a los usuarios
export async function register(userData: User) {
  const result = await repository.createContent(userData);
  if (result) {
    return result;
  } else {
    throw new Error("Error al ingresar los datos.");
  }
}

// Servicio para enviar un email con el idUser
export async function sendMail(email: string) {
  const oauth2Client = new OAuth2(
    process.env.EMAIL_ID,
    process.env.EMAIL_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.EMAIL_REFRESH,
  });

  let newToken: any;

  oauth2Client.getAccessToken((err, token) => {
    if (err) return console.error(err);
    newToken = token;
  });
  const EMAIL = process.env.EMAIL_NODE;
  const transporter = createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: process.env.EMAIL_ID,
      clientSecret: process.env.EMAIL_SECRET,
      refreshToken: process.env.EMAIL_REFRESH,
      accessToken: newToken,
    },
  });

  // Traigo la informacion desde el servidor
  const result = await repository.findByEmail(email);
  const idUser = result?.id;

  // Las configuraciones del Mail
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "¡Recupera tu cuenta de ProjectForDentist!",
    text: `Recupera tu cuenta en: www.projectfordentist.com/recuperar-cuenta/${idUser}`,
  };

  // Este es el que se encarga de enviar al Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(info.response);
    }
  });
}

// Servicio de Recuperacion de contraseña
export async function recoverPassword(idUser: string, password: string) {
  try {
    const response = await repository.updatePasswordById(idUser, password);
    return response;
  } catch (error) {
    console.error({ msg: error });
  }
}

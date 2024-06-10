import { Request, Response } from "express";
import {
  authorize,
  register,
  sendMail,
  recoverPassword,
} from "../services/AuthService";
import UserRequest from "../interfaces/IUserRequest";
import User from "../models/User";

class AuthController {
  public constructor() {}

  public async authorizeUser(req: Request, res: Response) {
    try {
      const { email, password, state } = req.body;
      const token = await authorize(email, password);
      console.log(`El usuario: ${email} inicio sesion.`);
      if (state) {
        res.cookie("token", token, {
          httpOnly: true, // Solo ser leido por  el servidor
          maxAge: 24 * 60 * 60 * 1000, // 24 Horas
          sameSite: "none",
        });
      } else {
        res.cookie("token", token, { httpOnly: true, sameSite: "none" });
      }
      res.status(200).json({ access: true });
    } catch (error) {
      res.status(401).json({ access: false });
    }
  }

  public async registerUser(req: Request, res: Response) {
    try {
      const { names, surnames, email, password } = req.body;
      const user = new User(names, surnames, email, password);
      await register(user);
      res.status(200).json({ register: true });
    } catch (error) {
      res.status(500).json({ register: false });
    }
  }

  public async closeUser(req: Request, res: Response) {
    try {
      const idUser = (req as UserRequest).user;
      if (idUser) {
        res.clearCookie("token");
      } else throw "Usuario → Sin sesion pendiente";
      res.status(200).json({ msg: "Sesion Cerrada." });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  public async recoverByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await sendMail(email);
      res.status(200).json({ msg: "Envio exitoso." });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  public async changePassword(req: Request, res: Response) {
    try {
      const idUser = req.params.id;
      const { password } = req.body;
      const response = await recoverPassword(idUser, password);
      res.status(200).json({ msg: response });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }
}

export default AuthController;

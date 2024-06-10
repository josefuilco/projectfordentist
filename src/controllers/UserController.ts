import { Request, Response } from "express";
import UserService from "../services/UserService";
import UserRequest from "../interfaces/IUserRequest";
import MysqlConnection from "../connection/MysqlConnection";
import UserRepository from "../repositories/UserRepository";
import User from "../models/User";

// Inyeccion de dependencias
const connection = MysqlConnection.getInstance();
const repository = new UserRepository(connection);
const service = new UserService(repository);

// Clase controladora
class UserController {
  public constructor() {}

  public async view(req: Request, res: Response) {
    try {
      const idUser = (req as UserRequest).user;
      const response = await service.getPerfilById(idUser as string);
      res.status(200).json({ user: response });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  public async change(req: Request, res: Response) {
    try {
      const idUser = (req as UserRequest).user;
      const { names, surnames, email, password } = req.body;
      const userChanged = new User(names, surnames, email, password);
      userChanged.setId(idUser as string);
      const response = await service.setChange(userChanged);
      res.status(200).json({ user: response });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const idUser = (req as UserRequest).user;
      const response = await service.deleteUser(idUser as string);
      res.clearCookie("token", {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });
      res.status(200).json({ success: true, user: response });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }
}

export default UserController;

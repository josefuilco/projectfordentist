import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import UserRequest from "../interfaces/IUserRequest";

const useToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToken = req.cookies.token;
    if (!userToken) {
      throw "Token → No Existente";
    }
    const decoded = jwt.verify(userToken, "TP2024ODONTOLOGOPROJECT");
    if (!decoded) {
      throw "Token → No Autorizado";
    }
    (req as UserRequest).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: error });
  }
};

export default useToken;

import { NextFunction, Request, Response } from "express";

const usePrivateKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    const privateKey = req.headers.authorization;
    const SK =
      process.env.PRIVATE_KEY || "sk-7550d35a69be9aca9af9c29b880dc3adea01be";
    if (privateKey === SK) {
      next();
    } else {
      throw "API → No Autorizado.";
    }
  } catch (error) {
    res.status(401).json({ msg: error });
  }
};

export default usePrivateKey;

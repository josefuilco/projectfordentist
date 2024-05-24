import { Request } from "express";
import * as jwt from "jsonwebtoken";

interface UserRequest extends Request {
  user: string | jwt.JwtPayload;
}

export default UserRequest;

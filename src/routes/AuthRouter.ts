import { Router } from "express";
import AuthController from "../controllers/AuthController";
import useToken from "../middlewares/useToken";

const AuthRouter = Router();

// Inyeccion de dependencias
const authController = new AuthController();

// Loggear al Usuario
AuthRouter.post("/auth/iniciar-sesion", authController.authorizeUser);

// Registrar al usuario
AuthRouter.post("/auth/registrar", authController.registerUser);

// Cerrar sesion
AuthRouter.get("/auth/cerrar-sesion", useToken, authController.closeUser);

// Recuperar Contraseña
AuthRouter.post("/auth/recuperar", authController.recoverByEmail);

// Cambiar contraseña
AuthRouter.post("auth/ChangePassword/:id", authController.changePassword);

export default AuthRouter;

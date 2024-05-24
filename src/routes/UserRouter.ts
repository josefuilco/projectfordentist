import { Router } from "express";
import useToken from "../middlewares/useToken";
import UserController from "../controllers/UserController";

const UserRouter = Router();

// Instanciamos el controllador
const userController = new UserController();

// Usando Middleware
UserRouter.use(useToken);

// Ver perfil del usuario
UserRouter.get("/usuario/ver", userController.view);

// Actualizar el perfil
UserRouter.put("/usuario/guardar-cambios", userController.change);

// Borrar perfil
UserRouter.delete("/usuario/borrar-cuenta", userController.delete);

export default UserRouter;

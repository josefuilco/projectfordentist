import { Router } from "express";
import useToken from "../middlewares/useToken";
import ProjectController from "../controllers/ProjectController";

const ProjectRouter = Router();

// Instanciamos el controllador
const projectController = new ProjectController();

// Generalizando el middleware
ProjectRouter.use(useToken);

// Crear un proyecto
ProjectRouter.post("/proyecto/crear", projectController.createProject);

// Ver todos los proyectos
ProjectRouter.get("/proyecto/ver", projectController.viewAll);

// Ver un proyecto
ProjectRouter.get("/proyecto/ver/:id", projectController.ViewOne);

// Actualizar las generalidades del proyecto
ProjectRouter.put(
  "/proyecto/actualizar-generalidades",
  projectController.saveGeneralities
);

// Actualizar las especificaciones al proyecto
ProjectRouter.put(
  "/proyecto/actualizar-especificaciones",
  projectController.saveEspecifications
);

// Añadir presupuesto del proyecto
ProjectRouter.post(
  "/proyecto/agregar/presupuesto",
  projectController.addBudget
);

// Actualizar presupuesto del proyecto
ProjectRouter.put(
  "/proyecto/modificar/presupuesto/:id",
  projectController.modifyBudget
);

// Borrar el presupuesto
ProjectRouter.delete(
  "/proyecto/eliminar/actividad/:id",
  projectController.deleteBudget
);

// Borrar el proyecto
ProjectRouter.delete("/proyecto/borrar/:id", projectController.deleteProject);

export default ProjectRouter;

import { Router } from "express";
import useToken from "../middlewares/useToken";
import DocumentController from "../controllers/DocumentController";

const DocumentRouter = Router();

// Instanciamos el controllador
const documentController = new DocumentController();

// Usando el middleware
DocumentRouter.use(useToken);

// Imprimiendo documento
DocumentRouter.get(
  "/documento/imprimir/:id",
  documentController.printDocumentQuantitative
);

export default DocumentRouter;

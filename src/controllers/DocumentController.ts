import { Request, Response } from "express";
import { printDocument } from "../services/DocumentService";
import UserRequest from "../interfaces/IUserRequest";

class DocumentController {
  public constructor() {}

  public async printDocumentQuantitative(req: Request, res: Response) {
    try {
      const idUser = (req as UserRequest).user;
      const idProject = req.params.id;
      const file = await printDocument(idProject, idUser as string);
      res.status(200).send(file);
    } catch (error) {
      res.status(401).json({ error: error });
    }
  }
}

export default DocumentController;

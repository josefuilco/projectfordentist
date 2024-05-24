import { Request, Response } from "express";
import MysqlConnection from "../connection/MysqlConnection";
import ProjectRepository from "../repositories/ProjectRepository";
import ProjectService from "../services/ProjectService";
import UserRequest from "../interfaces/IUserRequest";
import Project from "../models/Project";
import ProjectDetail from "../models/ProjectDetail";
import BudgetDetail from "../models/BudgetDetail";
import ActivityDetails from "../models/ActivityDetails";

// Inyectamos las dependencias
const connection = MysqlConnection.getInstance();
const repository = new ProjectRepository(connection);
const service = new ProjectService(repository);

class ProjectController {
  public constructor() {}

  // Crea un proyecto
  public async createProject(req: Request, res: Response) {
    try {
      const idUser = (req as UserRequest).user;
      const { Title } = req.body;
      const response = await service.createNewProject(Title, idUser as string);
      res
        .status(200)
        .json({ msg: "Proyecto creado con exito.", res: response });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  // Ver todos los proyectos
  public async viewAll(req: Request, res: Response) {
    try {
      const idUser = (req as UserRequest).user;
      const response = await service.listAll(idUser as string);
      res.status(200).json(response);
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  // Ver un solo proyecto
  public async ViewOne(req: Request, res: Response) {
    try {
      const idProject = req.params.id;
      const response = await service.listOne(idProject);
      res.status(200).json(response);
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  // Guardar las generalidades del proyecto
  public async saveGeneralities(req: Request, res: Response) {
    try {
      const body = req.body;
      const project = new Project();
      project.IdProject = body.IdProject;
      project.Title = body.Title;
      project.ProjectType = body.ProjectType;
      project.Advisor = body.Advisor;
      project.Coadvisor = body.Coadvisor;
      project.Faculty = body.Faculty;
      project.School = body.School;
      project.DevelopmentPlace = body.DevelopmentPlace;
      project.Duration = body.Duration;
      project.StartProject = body.StartProject;
      project.FinishProject = body.FinishProject;
      project.TimeProject = body.TimeProject;
      const response = await service.changeGeneralities(project);
      res.status(200).json(response);
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  // Guardar las especificaciones
  public async saveEspecifications(req: Request, res: Response) {
    try {
      const body = req.body;
      const especificacion = new ProjectDetail();
      especificacion.IdDetail = body.IdDetail;
      especificacion.Problema = body.Problema;
      especificacion.Antecedentes = body.Antecedentes;
      especificacion.ProblemaGeneral = body.ProblemaGeneral;
      especificacion.ProblemaEspecifico = body.ProblemaEspecifico;
      especificacion.Justificacion = body.Justificacion;
      especificacion.Importancia = body.Importancia;
      especificacion.ObjetivoGeneral = body.ObjetivoGeneral;
      especificacion.ObjetivoEspecifico = body.ObjetivoEspecifico;
      especificacion.HipotesisGeneral = body.HipotesisGeneral;
      especificacion.HipotesisEspecifica = body.HipotesisEspecifica;
      especificacion.VariableIndependiente = body.VariableIndependiente;
      especificacion.VariableDependiente = body.VariableDependiente;
      especificacion.TipoInvestigacion = body.TipoInvestigacion;
      especificacion.Poblacion = body.Poblacion;
      especificacion.Muestra = body.Muestra;
      especificacion.Muestreo = body.Muestreo;
      especificacion.TipoMuestreo = body.TipoMuestreo;
      especificacion.UnidadMuestral = body.UnidadMuestral;
      especificacion.CriteriosInclusion = body.CriteriosInclusion;
      especificacion.CriteriosExclusion = body.CriteriosExclusion;
      especificacion.RecoleccionDatos = body.RecoleccionDatos;
      especificacion.AnalisisInterpretacion = body.AnalisisInterpretacion;
      especificacion.Financiamiento = body.Financiamiento;
      especificacion.ReferenciasBibliograficas = body.ReferenciasBibliograficas;
      console.log(especificacion);
      const response = await service.changeSpecifications(especificacion);
      res.status(200).json({ msg: "Acutalizacion exitosa.", res: response });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  // Añadir presupuesto al proyecto con su nombre de actividad
  public async addBudget(req: Request, res: Response) {
    try {
      const idUser = (req as UserRequest).user;
      const body = req.body;
      const budget = new BudgetDetail();
      budget.ActivityName = body.ActivityName;
      const response = await service.addBudget(
        budget,
        body.IdDetail,
        body.IdProject,
        idUser as string
      );
      res.status(200).json({ msg: "Nuevo presupuesto creado.", res: response });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  // Modificar un presupuesto por su id
  public async modifyBudget(req: Request, res: Response) {
    try {
      const idUser = (req as UserRequest).user;
      const body = req.body;
      const idBudget = req.params.id;
      // TODO: Añadir el bugdet a un objeto del Modelo BudgetDetail
      const budget = new BudgetDetail();
      budget.IdBudget = idBudget;
      budget.ActivityName = body.ActivityName;
      if (body.ActivityDetails) {
        for (const activity of body.ActivityDetails) {
          const newActivity = new ActivityDetails();
          newActivity.Resources = activity.Resources;
          newActivity.Metrics = activity.Metrics;
          newActivity.Amount = activity.Amount;
          newActivity.Cost = activity.Cost;
          newActivity.CostTotal = activity.CostTotal;
          budget.ActivityDetails = [...budget.ActivityDetails, newActivity];
        }
      }
      const response = await service.modifyBudget(
        budget,
        body.IdProject,
        idUser as string
      );
      res.status(200).json({ msg: "Presupuesto modificado", res: response });
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  // Borrar un presupuesto por su id
  public async deleteBudget(req: Request, res: Response) {
    try {
      const idBudget = req.params.id;
      const response = await service.deleteBudget(idBudget);
      res.status(200).json(response);
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }

  // Borrar el proyecto
  public async deleteProject(req: Request, res: Response) {
    try {
      const idProject = req.params.id;
      const response = await service.deleteProject(idProject);
      res.status(200).json(response);
    } catch (error) {
      res.status(401).json({ msg: error });
    }
  }
}

export default ProjectController;

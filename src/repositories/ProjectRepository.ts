import IConnection from "../interfaces/IConnection";
import IRepository from "../interfaces/IRepository";
import ActivityDetails from "../models/ActivityDetails";
import BudgetDetail from "../models/BudgetDetail";
import Project from "../models/Project";
import ProjectDetail from "../models/ProjectDetail";

class ProjectRepository implements IRepository<Project> {
  public constructor(private readonly connection: IConnection) {}

  public async createContent(data: Project) {
    try {
      await this.connection.connect();
      const projectQuery =
        "INSERT INTO Projects (IdProject, IdUser, Title, ProjectType, Advisor, Coadvisor, Faculty, School, DevelopmentPlace, Duration, StartProject, FinishProject, TimeProject) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
      const projectResult = await this.connection.doQuery(
        projectQuery,
        data.getParams()
      );
      const detailQuery =
        "INSERT INTO ProjectDetail (IdDetail, IdProject, IdUser, Problema, Antecedentes, ProblemaGeneral, ProblemaEspecifico, Justificacion, Importancia, ObjetivoGeneral, ObjetivoEspecifico, HipotesisGeneral, HipotesisEspecifica, VariableIndependiente, VariableDependiente, TipoInvestigacion, Poblacion, Muestra, Muestreo, TipoMuestreo, UnidadMuestral, CriteriosInclusion, CriteriosExclusion, RecoleccionDatos, AnalisisInterpretacion, Financiamiento, ReferenciasBibliograficas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
      const detailResult = await this.connection.doQuery(detailQuery, [
        data.projectDetail.IdDetail,
        data.IdProject,
        data.IdUser,
        data.projectDetail.Problema,
        data.projectDetail.Antecedentes,
        data.projectDetail.ProblemaGeneral,
        data.projectDetail.ProblemaEspecifico,
        data.projectDetail.Justificacion,
        data.projectDetail.Importancia,
        data.projectDetail.ObjetivoGeneral,
        data.projectDetail.ObjetivoEspecifico,
        data.projectDetail.HipotesisGeneral,
        data.projectDetail.HipotesisEspecifica,
        data.projectDetail.VariableIndependiente,
        data.projectDetail.VariableDependiente,
        data.projectDetail.TipoInvestigacion,
        data.projectDetail.Poblacion,
        data.projectDetail.Muestra,
        data.projectDetail.Muestreo,
        data.projectDetail.TipoMuestreo,
        data.projectDetail.UnidadMuestral,
        data.projectDetail.CriteriosInclusion,
        data.projectDetail.CriteriosExclusion,
        data.projectDetail.RecoleccionDatos,
        data.projectDetail.AnalisisInterpretacion,
        data.projectDetail.Financiamiento,
        data.projectDetail.ReferenciasBibliograficas,
      ]);
      return {
        project: projectResult,
        detail: detailResult,
      };
    } catch (error) {
      console.error(error);
    } finally {
      await this.connection.disconect();
    }
  }

  public async findAll(id: string) {
    try {
      await this.connection.connect();
      const projectQuery =
        "SELECT IdProject, Title, ProjectType, Advisor, Faculty, School, DevelopmentPlace, Duration, StartProject, FinishProject, TimeProject FROM Projects WHERE IdUser = ?;";
      const projectResult = await this.connection.doQuery(projectQuery, [id]);
      return projectResult;
    } catch (error) {
      console.error(error);
    } finally {
      await this.connection.disconect();
    }
  }

  public async findById(id: string) {
    try {
      await this.connection.connect();
      const projectQuery =
        "SELECT IdProject, IdUser, Title, ProjectType, Advisor, Coadvisor, Faculty, School, DevelopmentPlace, Duration, StartProject, FinishProject, TimeProject FROM Projects WHERE IdProject = ?;";
      const projectResult = await this.connection.doQuery(projectQuery, [id]);
      const detailQuery =
        " SELECT IdDetail, Problema, Antecedentes, ProblemaGeneral, ProblemaEspecifico, Justificacion, Importancia, ObjetivoGeneral, ObjetivoEspecifico, HipotesisGeneral, HipotesisEspecifica, VariableIndependiente, VariableDependiente, TipoInvestigacion, Poblacion, Muestra, Muestreo, TipoMuestreo, UnidadMuestral, CriteriosInclusion, CriteriosExclusion, RecoleccionDatos, AnalisisInterpretacion, Financiamiento, ReferenciasBibliograficas FROM ProjectDetail WHERE IdProject = ?;";
      const detailResult = await this.connection.doQuery(detailQuery, [id]);
      const budgetQuery =
        "SELECT IdBudget, ActivityName FROM BudgetDetail WHERE IdDetail = ?;";
      const budgetResult = await this.connection.doQuery(budgetQuery, [
        detailResult[0]["IdDetail"],
      ]);
      const activityQuery =
        "SELECT IdDetail, Resources, Metrics, Amount, Cost, CostTotal FROM ActivityDetails WHERE IdBudget = ?;";

      // Unimos todos los datos
      let allBudget: Array<BudgetDetail> = [];
      if (budgetResult) {
        for (const budget of budgetResult) {
          const newBudget: BudgetDetail = new BudgetDetail();
          newBudget.IdBudget = budget["IdBudget"];
          newBudget.ActivityName = budget["ActivityName"];
          const isActivity = await this.connection.doQuery(activityQuery, [
            budget["IdBudget"],
          ]);
          if (isActivity) {
            for (const activity of isActivity) {
              const newActivity = new ActivityDetails();
              newActivity.IdDetail = activity["IdDetail"];
              newActivity.Resources = activity["Resources"];
              newActivity.Metrics = activity["Metrics"];
              newActivity.Amount = activity["Amount"];
              newActivity.Cost = activity["Cost"];
              newActivity.CostTotal = activity["CostTotal"];
              newBudget.ActivityDetails = [
                ...newBudget.ActivityDetails,
                newActivity,
              ];
            }
          }
          allBudget = [...allBudget, newBudget];
        }
      }

      const project = new Project(); // Devolveremos este objeto pero modificado con todos los datos del proyecto en especifico.
      // Ahora construimos nuestro proyecto general
      project.IdProject = id;
      project.IdUser = projectResult[0]["IdUser"];
      project.Title = projectResult[0]["Title"];
      project.ProjectType = projectResult[0]["ProjectType"];
      project.Advisor = projectResult[0]["Advisor"];
      project.Coadvisor = projectResult[0]["Coadvisor"];
      project.Faculty = projectResult[0]["Faculty"];
      project.School = projectResult[0]["School"];
      project.DevelopmentPlace = projectResult[0]["DevelopmentPlace"];
      project.Duration = projectResult[0]["Duration"];
      project.StartProject = projectResult[0]["StartProject"];
      project.FinishProject = projectResult[0]["FinishProject"];
      project.TimeProject = projectResult[0]["TimeProject"];
      // Ahora construimos nuestro proyecto especifico
      project.projectDetail.IdDetail = detailResult[0]["IdDetail"];
      project.projectDetail.Problema = detailResult[0]["Problema"];
      project.projectDetail.Antecedentes = detailResult[0]["Antecedentes"];
      project.projectDetail.ProblemaGeneral =
        detailResult[0]["ProblemaGeneral"];
      project.projectDetail.ProblemaEspecifico =
        detailResult[0]["ProblemaEspecifico"];
      project.projectDetail.Justificacion = detailResult[0]["Justificacion"];
      project.projectDetail.Importancia = detailResult[0]["Importancia"];
      project.projectDetail.ObjetivoGeneral =
        detailResult[0]["ObjetivoGeneral"];
      project.projectDetail.ObjetivoEspecifico =
        detailResult[0]["ObjetivoEspecifico"];
      project.projectDetail.HipotesisGeneral =
        detailResult[0]["HipotesisGeneral"];
      project.projectDetail.HipotesisEspecifica =
        detailResult[0]["HipotesisEspecifica"];
      project.projectDetail.VariableIndependiente =
        detailResult[0]["VariableIndependiente"];
      project.projectDetail.VariableDependiente =
        detailResult[0]["VariableDependiente"];
      project.projectDetail.TipoInvestigacion =
        detailResult[0]["TipoInvestigacion"];
      project.projectDetail.Poblacion = detailResult[0]["Poblacion"];
      project.projectDetail.Muestra = detailResult[0]["Muestra"];
      project.projectDetail.Muestreo = detailResult[0]["Muestreo"];
      project.projectDetail.TipoMuestreo = detailResult[0]["TipoMuestreo"];
      project.projectDetail.UnidadMuestral = detailResult[0]["UnidadMuestral"];
      project.projectDetail.CriteriosInclusion =
        detailResult[0]["CriteriosInclusion"];
      project.projectDetail.CriteriosExclusion =
        detailResult[0]["CriteriosExclusion"];
      project.projectDetail.RecoleccionDatos =
        detailResult[0]["RecoleccionDatos"];
      project.projectDetail.AnalisisInterpretacion =
        detailResult[0]["AnalisisInterpretacion"];
      project.projectDetail.Financiamiento = detailResult[0]["Financiamiento"];
      project.projectDetail.ReferenciasBibliograficas =
        detailResult[0]["ReferenciasBibliograficas"];
      // Ahora construimos lo restante
      if (allBudget) {
        project.projectDetail.budgetDetail = allBudget;
      }
      return project;
    } catch (error) {
      console.error(error);
    } finally {
      await this.connection.disconect();
    }
  }

  // Metodo encargado de modificar las generalidades
  public async updateEntity(data: Project) {
    try {
      await this.connection.connect();
      const projectQuery =
        "UPDATE Projects SET Title = ?, ProjectType = ?, Advisor = ?, Coadvisor = ?, Faculty = ?, School = ?, DevelopmentPlace = ?, Duration = ?, StartProject = ?, FinishProject = ?, TimeProject = ? WHERE IdProject = ?;";
      const projectResult = await this.connection.doQuery(projectQuery, [
        data.Title,
        data.ProjectType,
        data.Advisor,
        data.Coadvisor,
        data.Faculty,
        data.School,
        data.DevelopmentPlace,
        data.Duration,
        data.StartProject,
        data.FinishProject,
        data.TimeProject,
        data.IdProject,
      ]);
      return { result: projectResult };
    } catch (error) {
      console.error(error);
    } finally {
      await this.connection.disconect();
    }
  }

  // Metodo encargado de modificar las especificaciones
  public async updateSpecifics(data: ProjectDetail) {
    try {
      await this.connection.connect();
      const detailQuery =
        "UPDATE ProjectDetail SET Problema = ?, Antecedentes = ?, ProblemaGeneral = ?, ProblemaEspecifico = ?, Justificacion = ?, Importancia = ?, ObjetivoGeneral = ?, ObjetivoEspecifico = ?, HipotesisGeneral = ?, HipotesisEspecifica = ?, VariableIndependiente = ?, VariableDependiente = ?, TipoInvestigacion = ?, Poblacion = ?, Muestra = ?, Muestreo = ?, TipoMuestreo = ?, UnidadMuestral = ?, CriteriosInclusion = ?, CriteriosExclusion = ?, RecoleccionDatos = ?, AnalisisInterpretacion = ?, Financiamiento = ?, ReferenciasBibliograficas = ? WHERE IdDetail = ?;";
      const detailResult = await this.connection.doQuery(
        detailQuery,
        data.getParamsForId()
      );
      return { result: detailResult };
    } catch (error) {
      console.error(error);
    } finally {
      await this.connection.disconect();
    }
  }

  public async createBudget(
    dataBudget: BudgetDetail,
    idDetail: string,
    idProject: string,
    idUser: string
  ) {
    try {
      await this.connection.connect();
      const budgetQuery =
        "INSERT INTO BudgetDetail (IdBudget, IdDetail, Idproject, IdUser, ActivityName) VALUES (?, ?, ?, ?, ?);";
      const budgetResult = await this.connection.doQuery(budgetQuery, [
        dataBudget.IdBudget,
        idDetail,
        idProject,
        idUser,
        dataBudget.ActivityName,
      ]);
      return { result: budgetResult };
    } catch (error) {
      console.error(error);
    } finally {
      await this.connection.disconect();
    }
  }

  public async modifyBudget(
    budget: BudgetDetail,
    idProject: string,
    idUser: string
  ) {
    try {
      await this.connection.connect();
      // Query para actualizar el presupuesto y su nombre
      const budgetQuery =
        "UPDATE BudgetDetail SET ActivityName = ? WHERE IdBudget = ?;";
      // Query para borrar la actividad antes de insertarla
      const deleteActivity = "DELETE FROM ActivityDetails WHERE IdBudget = ?;";
      // Query para poder insertar las nuevas actividades
      const insertActivity =
        "INSERT INTO ActivityDetails (IdDetail, IdBudget, IdProject, IdUser, Resources, Metrics, Amount, Cost, CostTotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
      const budgetResult = await this.connection.doQuery(budgetQuery, [
        budget.ActivityName,
        budget.IdBudget,
      ]);
      const deleteResult = await this.connection.doQuery(deleteActivity, [
        budget.IdBudget,
      ]);
      if (budget.ActivityDetails) {
        for (const activity of budget.ActivityDetails) {
          await this.connection.doQuery(insertActivity, [
            activity.IdDetail,
            budget.IdBudget,
            idProject,
            idUser,
            activity.Resources,
            activity.Metrics,
            activity.Amount,
            activity.Cost,
            activity.CostTotal,
          ]);
        }
        return {
          result: "Tabla actualizada",
          update: budgetResult,
          delete: deleteResult,
        };
      } else {
        return { result: budgetResult };
      }
    } catch (error) {
      console.error(error);
    } finally {
      await this.connection.disconect();
    }
  }

  public async deleteBudget(idBudget: string) {
    try {
      await this.connection.connect();
      const activityQuery = "DELETE FROM ActivityDetails WHERE IdBudget = ?;";
      const activityResult = await this.connection.doQuery(activityQuery, [
        idBudget,
      ]);
      const budgetQuery = "DELETE FROM BudgetDetail WHERE IdBudget = ?;";
      const budgetResult = await this.connection.doQuery(budgetQuery, [
        idBudget,
      ]);
      return { result: budgetResult, activity: activityResult };
    } catch (error) {
      console.error(error);
    } finally {
      await this.connection.disconect();
    }
  }

  public async deleteById(id: string) {
    try {
      await this.connection.connect();
      const activitiesQuery =
        "DELETE FROM ActivityDetails WHERE IdProject = ?;";
      const activitiesResult = await this.connection.doQuery(activitiesQuery, [
        id,
      ]);
      // Eliminamos los presupuestos
      const budgetQuery = "DELETE FROM BudgetDetail WHERE IdProject = ?;";
      const budgetResult = await this.connection.doQuery(budgetQuery, [id]);
      // Eliminamos los Detalles
      const detailQuery = "DELETE FROM ProjectDetail WHERE IdProject = ?;";
      const detailResult = await this.connection.doQuery(detailQuery, [id]);
      // Eliminamos el Proyecto
      const projectQuery = "DELETE FROM Projects WHERE IdProject = ?;";
      const projectResult = await this.connection.doQuery(projectQuery, [id]);
      return {
        result: [projectResult, detailResult, budgetResult, activitiesResult],
      };
    } catch (error) {
      console.error(error);
    } finally {
      await this.connection.disconect();
    }
  }
}

export default ProjectRepository;

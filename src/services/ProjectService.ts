import BudgetDetail from "../models/BudgetDetail";
import Project from "../models/Project";
import ProjectDetail from "../models/ProjectDetail";
import ProjectRepository from "../repositories/ProjectRepository";

class ProjectService {
  public constructor(private readonly repository: ProjectRepository) {}

  public async createNewProject(title: string, idUser: string) {
    const project = new Project();
    project.IdUser = idUser;
    project.Title = title;
    const response = await this.repository.createContent(project);
    return response;
  }

  public async listAll(idUser: string) {
    const response = await this.repository.findAll(idUser);
    return response;
  }

  public async listOne(idProject: string) {
    const response = await this.repository.findById(idProject);
    return response;
  }

  public async changeGeneralities(project: Project) {
    const response = await this.repository.updateEntity(project);
    return response;
  }

  public async changeSpecifications(details: ProjectDetail) {
    const response = await this.repository.updateSpecifics(details);
    return response;
  }

  public async addBudget(
    budget: BudgetDetail,
    idDetail: string,
    idProject: string,
    idUser: string
  ) {
    const response = await this.repository.createBudget(
      budget,
      idDetail,
      idProject,
      idUser
    );
    return response;
  }

  public async modifyBudget(
    budget: BudgetDetail,
    idProject: string,
    idUser: string
  ) {
    const response = await this.repository.modifyBudget(
      budget,
      idProject,
      idUser
    );
    return response;
  }

  public async deleteBudget(idBudget: string) {
    const response = await this.repository.deleteBudget(idBudget);
    return response;
  }

  public async deleteProject(idProject: string) {
    const response = await this.repository.deleteById(idProject);
    return response;
  }
}

export default ProjectService;

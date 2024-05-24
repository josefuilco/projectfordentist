import ProjectDetail from "./ProjectDetail";
import { randomUUID } from "crypto";

class Project {
  public IdProject: string = randomUUID();
  public IdUser: string = "";
  public Title: string = "Sin titulo";
  public ProjectType: string = "Cuantitativo";
  public Advisor: string = "none";
  public Coadvisor: string = "none";
  public Faculty: string = "none";
  public School: string = "none";
  public DevelopmentPlace: string = "none";
  public Duration: number = 0;
  public StartProject: string = "2002-02-03";
  public FinishProject: string = "2024-02-23";
  public TimeProject: string = "00:00:00";
  public projectDetail: ProjectDetail = new ProjectDetail();

  public constructor() {}

  getParams() {
    return [
      this.IdProject,
      this.IdUser,
      this.Title,
      this.ProjectType,
      this.Advisor,
      this.Coadvisor,
      this.Faculty,
      this.School,
      this.DevelopmentPlace,
      this.Duration,
      this.StartProject,
      this.FinishProject,
      this.TimeProject,
    ];
  }
}
export default Project;

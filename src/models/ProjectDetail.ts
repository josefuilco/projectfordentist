import { randomUUID } from "crypto";
import BudgetDetail from "./BudgetDetail";

class ProjectDetail {
  public IdDetail: string = randomUUID();
  public Problema: string = "none";
  public Antecedentes: string = "none";
  public ProblemaGeneral: string = "none";
  public ProblemaEspecifico: string = "none";
  public Justificacion: string = "none";
  public Importancia: string = "none";
  public ObjetivoGeneral: string = "none";
  public ObjetivoEspecifico: string = "none";
  public HipotesisGeneral: string = "none";
  public HipotesisEspecifica: string = "none";
  public VariableIndependiente: string = "none";
  public VariableDependiente: string = "none";
  public TipoInvestigacion: string = "none";
  public Poblacion: string = "none";
  public Muestra: string = "none";
  public Muestreo: string = "none";
  public TipoMuestreo: string = "none";
  public UnidadMuestral: string = "none";
  public CriteriosInclusion: string = "none";
  public CriteriosExclusion: string = "none";
  public RecoleccionDatos: string = "none";
  public AnalisisInterpretacion: string = "none";
  public Financiamiento: string = "none";
  public ReferenciasBibliograficas: string = "none";
  public budgetDetail: BudgetDetail[] = [];
  public constructor() {}

  public getParamsForId() {
    return [
      this.Problema,
      this.Antecedentes,
      this.ProblemaGeneral,
      this.ProblemaEspecifico,
      this.Justificacion,
      this.Importancia,
      this.ObjetivoGeneral,
      this.ObjetivoEspecifico,
      this.HipotesisGeneral,
      this.HipotesisEspecifica,
      this.VariableIndependiente,
      this.VariableDependiente,
      this.TipoInvestigacion,
      this.Poblacion,
      this.Muestra,
      this.Muestreo,
      this.TipoMuestreo,
      this.UnidadMuestral,
      this.CriteriosInclusion,
      this.CriteriosExclusion,
      this.RecoleccionDatos,
      this.AnalisisInterpretacion,
      this.Financiamiento,
      this.ReferenciasBibliograficas,
      this.IdDetail,
    ];
  }
}

export default ProjectDetail;

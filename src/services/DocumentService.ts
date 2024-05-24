import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import dateToString from "../utils/dateToString";
import MysqlConnection from "../connection/MysqlConnection";
import ProjectRepository from "../repositories/ProjectRepository";
import UserRepository from "../repositories/UserRepository";

const connection = MysqlConnection.getInstance();
const projectRepository = new ProjectRepository(connection);
const userRepository = new UserRepository(connection);

export async function printDocument(idProject: string, idUser: string) {
  const content = fs.readFileSync(
    path.resolve(__dirname, "../static/template_tesis_cuantitativa.docx"),
    "binary"
  );
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  const user = await userRepository.findById(idUser);
  const project = await projectRepository.findById(idProject);

  const nombre_completo = `${user?.getName()}, ${user?.getSurname()}`;

  const data = {
    titulo: project?.Title,
    autor: nombre_completo,
    asesor: project?.Advisor,
    coasesor: project?.Coadvisor,
    facultad: project?.Faculty,
    escuela: project?.School,
    lugar: project?.DevelopmentPlace,
    fecha_inicio: dateToString(project?.StartProject as string),
    fecha_fin: dateToString(project?.FinishProject as string),
    formulacion_problema: project?.projectDetail.Problema,
    antecedentes: project?.projectDetail.Antecedentes,
    problema_general: project?.projectDetail.ProblemaGeneral,
    problema_especifico: project?.projectDetail.ProblemaEspecifico,
    justificacion: project?.projectDetail.Justificacion,
    importancia: project?.projectDetail.Importancia,
    objetivo_general: project?.projectDetail.ObjetivoGeneral,
    objetivo_especifico: project?.projectDetail.ObjetivoEspecifico,
    hipotesis_general: project?.projectDetail.HipotesisGeneral,
    hipotesis_especifica: project?.projectDetail.HipotesisEspecifica,
    variable_independiente: project?.projectDetail.VariableIndependiente,
    variable_dependiente: project?.projectDetail.VariableDependiente,
    tipo_investigacion: project?.projectDetail.TipoInvestigacion,
    poblacion: project?.projectDetail.Poblacion,
    muestra: project?.projectDetail.Muestra,
    muestreo: project?.projectDetail.Muestreo,
    tipo_muestreo: project?.projectDetail.TipoMuestreo,
    unidad_muestral: project?.projectDetail.UnidadMuestral,
    criterios_inclusion: project?.projectDetail.CriteriosInclusion,
    criterios_exclusion: project?.projectDetail.CriteriosExclusion,
    recoleccion_datos: project?.projectDetail.RecoleccionDatos,
    analisis_interpretacion: project?.projectDetail.AnalisisInterpretacion,
    financiamiento: project?.projectDetail.Financiamiento,
    actividades: project?.projectDetail.budgetDetail,
    referencias_bibliograficas:
      project?.projectDetail.ReferenciasBibliograficas,
  };

  // Ingresamos la data necesario para cambiarla en el documento
  doc.setData(data);

  // Renderizamos la data del documento
  doc.render();

  // Transformamos el documento de un buffer binario a docx
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  // Retornamos el buffer del documento
  return buf;
}

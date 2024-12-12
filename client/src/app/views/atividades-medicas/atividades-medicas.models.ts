import { SelecionarMedicosDto } from '../medicos/medicos.models';

export enum TipoAtividadeMedica {
  Consulta,
  Cirurgia,
}

export interface SelecionarAtividadesMedicasDto {
  id: string;
  inicio: Date;
  termino: Date;
  tipoAtividade: TipoAtividadeMedica;
  medicos: SelecionarMedicosDto[];
}

export interface SelecionarAtividadesMedicasResponse {
  quantidadadeRegistros: number;
  registros: SelecionarAtividadesMedicasDto[];
}

export interface SelecionarAtividadeMedicaPorIdResponse {
  id: string;
  inicio: Date;
  termino: Date;
  tipoAtividade: TipoAtividadeMedica;
  medicos: SelecionarMedicosDto[];
}

export interface InserirAtividadeMedicaRequest {
  inicio: Date;
  termino: Date;
  tipoAtividade: TipoAtividadeMedica;
  medicos: string[];
}

export interface InserirAtividadeMedicaResponse {
  id: string;
}

export interface EditarAtividadeMedicaPartialRequest {
  inicio: Date;
  termino: Date;
  medicos: string[];
}

export interface EditarAtividadeMedicaResponse {
  id: string;
}

export interface ExcluirAtividadeMedicaResponse {}

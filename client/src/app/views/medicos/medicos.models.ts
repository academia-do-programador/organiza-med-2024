export interface PeriodoMedicosMaisAtivosDto {
  inicioPeriodo: string;
  terminoPeriodo: string;
}

export interface SelecionarRegistroDeHorasTrabalhadasDto {
  medicoId: string;
  medico: string;
  totalDeHorasTrabalhadas: number;
}

export interface SelecionarMedicosMaisAtivosResponse {
  quantidadeRegistros: number;
  registros: SelecionarRegistroDeHorasTrabalhadasDto[];
}

export interface SelecionarMedicosDto {
  id: string;
  nome: string;
  crm: string;
}

export interface SelecionarMedicosResponse {
  quantidadeRegistros: number;
  registros: SelecionarMedicosDto[];
}

export interface SelecionarMedicoPorIdResponse {
  id: string;
  nome: string;
  crm: string;
}

export interface InserirMedicoRequest {
  nome: string;
  crm: string;
}

export interface InserirMedicoResponse {
  id: string;
}

export interface EditarMedicoRequest {
  nome: string;
  crm: string;
}

export interface EditarMedicoResponse {
  id: string;
}

export interface ExcluirMedicoResponse {}

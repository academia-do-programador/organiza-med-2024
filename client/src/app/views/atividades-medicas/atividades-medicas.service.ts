import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { RespostaHttp } from '../../shared/models/http-response.model';
import {
  EditarAtividadeMedicaPartialRequest,
  EditarAtividadeMedicaResponse,
  ExcluirAtividadeMedicaResponse,
  InserirAtividadeMedicaRequest,
  InserirAtividadeMedicaResponse,
  SelecionarAtividadeMedicaPorIdResponse,
  TipoAtividadeMedica,
} from './atividades-medicas.models';
import { BaseHttpService } from '../../shared/services/base-http-service';

@Injectable({ providedIn: 'root' })
export class AtividadesMedicasService extends BaseHttpService {
  private readonly url = `${environment.apiUrl}/atividades-medicas`;

  constructor(http: HttpClient) {
    super(http);
  }

  public inserir(
    dados: InserirAtividadeMedicaRequest
  ): Observable<InserirAtividadeMedicaResponse> {
    return this.http
      .post<RespostaHttp>(this.url, dados)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    dados: EditarAtividadeMedicaPartialRequest
  ): Observable<EditarAtividadeMedicaResponse> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .put<RespostaHttp>(urlCompleto, dados)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<ExcluirAtividadeMedicaResponse> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<RespostaHttp>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(
    tipoAtividade?: TipoAtividadeMedica
  ): Observable<SelecionarAtividadeMedicaPorIdResponse> {
    let urlCompleto = this.url;

    if (tipoAtividade)
      urlCompleto += `?tipoAtividade=${tipoAtividade.valueOf()}`;

    return this.http
      .get<RespostaHttp>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(
    id: string
  ): Observable<SelecionarAtividadeMedicaPorIdResponse> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .get<RespostaHttp>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  InserirMedicoResponse,
  InserirMedicoRequest,
  SelecionarMedicosResponse,
  EditarMedicoRequest,
  SelecionarMedicoPorIdResponse,
  ExcluirMedicoResponse,
} from './medicos.models';
import { RespostaHttp } from '../../shared/models/http-response.model';
import { BaseHttpService } from '../../shared/services/base-http-service';

@Injectable({ providedIn: 'root' })
export class MedicosService extends BaseHttpService {
  private readonly url = `${environment.apiUrl}/medicos`;

  constructor(http: HttpClient) {
    super(http);
  }

  public inserir(
    dados: InserirMedicoRequest
  ): Observable<InserirMedicoResponse> {
    return this.http
      .post<RespostaHttp>(this.url, dados)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(
    id: string,
    dados: EditarMedicoRequest
  ): Observable<InserirMedicoResponse> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .put<RespostaHttp>(urlCompleto, dados)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<ExcluirMedicoResponse> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .delete<RespostaHttp>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<SelecionarMedicosResponse> {
    return this.http
      .get<RespostaHttp>(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarPorId(
    id: string
  ): Observable<SelecionarMedicoPorIdResponse> {
    const urlCompleto = `${this.url}/${id}`;

    return this.http
      .get<RespostaHttp>(urlCompleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }
}

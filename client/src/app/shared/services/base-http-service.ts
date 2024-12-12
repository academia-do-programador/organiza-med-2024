import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { RespostaHttp } from '../models/http-response.model';

export abstract class BaseHttpService {
  protected constructor(protected http: HttpClient) {}

  protected processarDados(resposta: RespostaHttp): any {
    if (resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear dados requisitados.', {
      cause: resposta.erros,
    });
  }

  protected processarFalha(resposta: HttpErrorResponse): Observable<never> {
    console.log(resposta);

    return throwError(() => new Error(resposta.error.erros[0]));
  }
}

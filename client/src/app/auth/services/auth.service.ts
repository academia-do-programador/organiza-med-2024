import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  AutenticarUsuarioRequest,
  RegistrarUsuarioRequest,
  TokenResponse,
} from '../models/auth.models';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public registrar(
    registro: RegistrarUsuarioRequest
  ): Observable<TokenResponse> {
    const urlCompleto = `${this.apiUrl}/auth/registrar`;

    return this.http
      .post<TokenResponse>(urlCompleto, registro)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public login(loginUsuario: AutenticarUsuarioRequest) {
    const urlCompleto = `${this.apiUrl}/auth/autenticar`;

    return this.http
      .post<TokenResponse>(urlCompleto, loginUsuario)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public logout() {
    const urlCompleto = `${this.apiUrl}/auth/sair`;

    return this.http.post(urlCompleto, {});
  }

  public validarExpiracaoToken(dataExpiracaoToken: Date): boolean {
    return dataExpiracaoToken > new Date(); // obtém a data de agora
  }

  private processarDados(resposta: any): TokenResponse {
    if (resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear chave de autenticação.', {
      cause: resposta.erros,
    });
  }

  protected processarFalha(resposta: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}

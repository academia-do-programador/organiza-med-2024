import { Injectable } from '@angular/core';
import { TokenResponse } from '../models/auth.models';

@Injectable()
export class LocalStorageService {
  private readonly chave: string = 'OrganizaMed.token';

  public salvarTokenAutenticacao(token: TokenResponse): void {
    const jsonString = JSON.stringify(token);

    localStorage.setItem(this.chave, jsonString);
  }

  public obterTokenAutenticacao(): TokenResponse | undefined {
    const jsonString = localStorage.getItem(this.chave);

    if (!jsonString) return undefined;

    return JSON.parse(jsonString);
  }

  public limparDadosLocais(): void {
    localStorage.removeItem(this.chave);
  }
}

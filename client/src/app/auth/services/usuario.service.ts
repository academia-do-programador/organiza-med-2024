import { Injectable } from '@angular/core';
import { UsuarioAutenticadoDto } from '../models/auth.models';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsuarioService {
  private usuarioAutenticadoSubject: BehaviorSubject<
    UsuarioAutenticadoDto | undefined
  >;

  constructor() {
    this.usuarioAutenticadoSubject = new BehaviorSubject<
      UsuarioAutenticadoDto | undefined
    >(undefined);
  }

  get usuarioAutenticado() {
    return this.usuarioAutenticadoSubject.asObservable();
  }

  public logarUsuario(usuario: UsuarioAutenticadoDto): void {
    this.usuarioAutenticadoSubject.next(usuario);
  }

  public logout(): void {
    this.usuarioAutenticadoSubject.next(undefined);
  }
}

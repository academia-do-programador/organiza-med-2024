import { inject } from '@angular/core';
import { CanMatchFn, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

export const authUserGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  return usuarioService.usuarioAutenticado.pipe(
    map((usuario) => {
      if (usuario) return router.parseUrl('/dashboard');

      return true;
    })
  );
};

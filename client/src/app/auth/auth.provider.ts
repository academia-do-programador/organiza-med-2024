import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsuarioService } from './services/usuario.service';
import { LocalStorageService } from './services/local-storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';

export const provideAuthentication = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    AuthService,
    UsuarioService,
    LocalStorageService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]);
};

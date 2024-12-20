import { ResolveFn, Routes } from '@angular/router';
import { authUserGuard } from './auth/guards/auth-user.guard';
import { authGuard } from './auth/guards/auth.guard';
import { UsuarioService } from './auth/services/usuario.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(
        (r) => r.DashboardComponent
      ),
    canMatch: [authGuard],
    resolve: { usuario: () => inject(UsuarioService).usuarioAutenticado },
  },

  {
    path: 'medicos',
    loadChildren: () =>
      import('./views/medicos/medicos.routes').then((r) => r.medicosRoutes),
    canMatch: [authGuard],
  },

  {
    path: 'atividades-medicas',
    loadChildren: () =>
      import('./views/atividades-medicas/atividades-medicas.routes').then(
        (r) => r.atividadesMedicasRoutes
      ),
    canMatch: [authGuard],
  },

  {
    path: 'registro',
    loadComponent: () =>
      import('./auth/views/registro/registro.component').then(
        (c) => c.RegistroComponent
      ),
    canMatch: [authUserGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/views/login/login.component').then(
        (c) => c.LoginComponent
      ),
    canMatch: [authUserGuard],
  },
];

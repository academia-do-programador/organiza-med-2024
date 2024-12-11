import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { AtividadesMedicasService } from './atividades-medicas.service';
import { ListagemConsultasComponent } from './listar/listagem-ativades-medicas.component';

export const atividadesMedicasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemConsultasComponent,
    resolve: {
      dados: () => inject(AtividadesMedicasService).selecionarTodos(),
    },
  },
];

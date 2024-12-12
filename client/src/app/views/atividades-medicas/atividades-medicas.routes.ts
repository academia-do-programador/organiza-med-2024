import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { AtividadesMedicasService } from './atividades-medicas.service';
import { ListagemConsultasComponent } from './listar/listagem-atividades-medicas.component';
import { CadastroAtividadeMedicaComponent } from './cadastrar/cadastro-atividade-medica.component';
import { MedicosService } from '../medicos/medicos.service';
import { ExclusaoAtividadeMedicaComponent } from './excluir/exclusao-atividade-medica.component';

export const atividadesMedicasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemConsultasComponent,
    resolve: {
      dados: () => inject(AtividadesMedicasService).selecionarTodos(),
    },
  },
  {
    path: 'cadastrar',
    component: CadastroAtividadeMedicaComponent,
    resolve: {
      medicos: () => inject(MedicosService).selecionarTodos(),
    },
  },
  {
    path: 'excluir/:id',
    component: ExclusaoAtividadeMedicaComponent,
    resolve: {
      dados: (route: ActivatedRouteSnapshot) =>
        inject(AtividadesMedicasService).selecionarPorId(route.params['id']),
    },
  },
];

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { AtividadesMedicasService } from './atividades-medicas.service';
import { MedicosService } from '../medicos/medicos.service';
import { ListagemConsultasComponent } from './listar/listagem-atividades-medicas.component';
import { CadastroAtividadeMedicaComponent } from './cadastrar/cadastro-atividade-medica.component';
import { ExclusaoAtividadeMedicaComponent } from './excluir/exclusao-atividade-medica.component';
import { VisualizacaoAtividadeMedicaComponent } from './visualizar/visualizacao-atividade-medica.component';
import { EdicaoAtividadeMedicaComponent } from './editar/edicao-atividade-medica.component';

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
    path: 'editar/:id',
    component: EdicaoAtividadeMedicaComponent,
    resolve: {
      dados: (route: ActivatedRouteSnapshot) =>
        inject(AtividadesMedicasService).selecionarPorId(route.params['id']),
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
  {
    path: 'detalhes/:id',
    component: VisualizacaoAtividadeMedicaComponent,
    resolve: {
      dados: (route: ActivatedRouteSnapshot) =>
        inject(AtividadesMedicasService).selecionarPorId(route.params['id']),
    },
  },
];

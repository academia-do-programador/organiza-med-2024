import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { ListagemMedicosComponent } from './listar/listagem-medicos.component';
import { MedicosService } from './medicos.service';
import { CadastroMedicoComponent } from './cadastrar/cadastro-medico.component';
import { EdicaoMedicoComponent } from './editar/edicao-medico.component';
import { ExclusaoMedicoComponent } from './excluir/exclusao-medico.component';
import { VisualizacaoMedicoComponent } from './visualizar/visualizacao-medico.component';

export const medicosRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  {
    path: 'listar',
    component: ListagemMedicosComponent,
    resolve: { dados: () => inject(MedicosService).selecionarTodos() },
  },

  {
    path: 'cadastrar',
    component: CadastroMedicoComponent,
  },
  {
    path: 'editar/:id',
    component: EdicaoMedicoComponent,
    resolve: {
      dados: (route: ActivatedRouteSnapshot) =>
        inject(MedicosService).selecionarPorId(route.params['id']),
    },
  },
  {
    path: 'excluir/:id',
    component: ExclusaoMedicoComponent,
    resolve: {
      dados: (route: ActivatedRouteSnapshot) =>
        inject(MedicosService).selecionarPorId(route.params['id']),
    },
  },
  {
    path: 'detalhes/:id',
    component: VisualizacaoMedicoComponent,
    resolve: {
      dados: (route: ActivatedRouteSnapshot) =>
        inject(MedicosService).selecionarPorId(route.params['id']),
    },
  },
];

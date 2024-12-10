import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ItemDashboard } from './models/item-dashboard.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsuarioAutenticadoDto } from '../../auth/models/auth.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @Input() usuarioAutenticado: UsuarioAutenticadoDto | undefined;

  itens: ItemDashboard[] = [
    {
      titulo: 'Médicos',
      descricao: 'Gerencie e visualize detalhes sobre médicos cadastrados.',
      rota: '/medicos',
      icone: 'people_group',
    },
    {
      titulo: 'Consultas',
      descricao:
        'Gerencie consultas futuras ou veja o histórico de registros passados.',
      rota: '/atividades-medicas/consultas',
      icone: 'monitor_heart',
    },
    {
      titulo: 'Cirurgias',
      descricao:
        'Gerencie cirurgias futuras ou veja o histórico de registros passados.',
      rota: '/atividades-medicas/cirurgias',
      icone: 'emergency',
    },
  ];

  constructor(private route: ActivatedRoute) {
    this.usuarioAutenticado = this.route.snapshot.data['usuario'];
  }
}

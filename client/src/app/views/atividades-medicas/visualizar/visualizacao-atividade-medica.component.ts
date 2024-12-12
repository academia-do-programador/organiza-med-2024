import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DetalhesAtividadeMedicaComponent } from '../shared/detalhes/detalhes-atividade-medica.component';
import { SelecionarAtividadeMedicaPorIdResponse } from '../atividades-medicas.models';

@Component({
  selector: 'app-visualizacao-atividade-medica',
  standalone: true,
  imports: [
    RouterLink,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,

    DetalhesAtividadeMedicaComponent,
  ],
  templateUrl: './visualizacao-atividade-medica.component.html',
})
export class VisualizacaoAtividadeMedicaComponent {
  detalhes!: SelecionarAtividadeMedicaPorIdResponse;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.detalhes = this.route.snapshot.data['dados'];
  }
}

import { DatePipe, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SelecionarAtividadesMedicasResponse } from '../atividades-medicas.models';
import { SelecionarMedicosDto } from '../../medicos/medicos.models';

@Component({
  selector: 'app-listagem-atividades-medicas',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DatePipe,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listagem-atividades-medicas.component.html',
})
export class ListagemConsultasComponent implements OnInit {
  dados!: SelecionarAtividadesMedicasResponse;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dados = this.route.snapshot.data['dados'];
  }

  public listarMedicosAtividade(medicos: SelecionarMedicosDto[]): string {
    return medicos.map((m) => m.nome).join(', ');
  }
}

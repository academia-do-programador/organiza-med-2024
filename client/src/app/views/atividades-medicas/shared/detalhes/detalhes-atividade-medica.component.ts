import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SelecionarAtividadeMedicaPorIdResponse } from '../../atividades-medicas.models';
import { DatePipe } from '@angular/common';
import { SelecionarMedicosDto } from '../../../medicos/medicos.models';

@Component({
  selector: 'app-detalhes-atividade-medica',
  standalone: true,
  imports: [DatePipe, MatCardModule],
  template: `
    <mat-card
      class="card-listagem card-animado mat-mdc-elevation-specific mat-elevation-z3"
    >
      <mat-card-header>
        <mat-card-subtitle>{{
          detalhes.tipoAtividade == 0 ? 'Consulta' : 'Cirurgia'
        }}</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content class="d-grid mt-4">
        <span
          ><strong>Início:</strong> {{ detalhes.inicio | date : 'short' }}</span
        >
        <span
          ><strong>Término:</strong>
          {{ detalhes.termino | date : 'short' }}</span
        >
        <span
          ><strong>Médico(s):</strong>
          {{ listarMedicosAtividade(detalhes.medicos) }}</span
        >
      </mat-card-content>
    </mat-card>
  `,
})
export class DetalhesAtividadeMedicaComponent {
  @Input({ required: true }) detalhes!: SelecionarAtividadeMedicaPorIdResponse;

  public listarMedicosAtividade(medicos: SelecionarMedicosDto[]): string {
    return medicos.map((m) => m.nome).join(', ');
  }
}

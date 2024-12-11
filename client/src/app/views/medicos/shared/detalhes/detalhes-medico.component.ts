import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SelecionarMedicoPorIdResponse } from '../../medicos.models';

@Component({
  selector: 'app-detalhes-medico',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card
      class="card-listagem card-animado mat-mdc-elevation-specific mat-elevation-z3"
    >
      <mat-card-header>
        <mat-card-title>{{ detalhes.nome }}</mat-card-title>
      </mat-card-header>

      <mat-card-content class="d-grid mt-4">
        <span><strong>CRM:</strong> {{ detalhes.crm }}</span>
      </mat-card-content>
    </mat-card>
  `,
})
export class DetalhesMedicoComponent {
  @Input({ required: true }) detalhes!: SelecionarMedicoPorIdResponse;
}

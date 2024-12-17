import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  SelecionarMedicosMaisAtivosResponse,
  SelecionarMedicosResponse,
} from '../medicos.models';
import { MatDialog } from '@angular/material/dialog';
import { MedicosMaisAtivosDialogComponent } from './medicos-mais-ativos/medicos-mais-ativos-dialog.component';
import { MedicosService } from '../medicos.service';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-listagem-medicos',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    AsyncPipe,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listagem-medicos.component.html',
})
export class ListagemMedicosComponent implements OnInit {
  dados!: SelecionarMedicosResponse;

  medicosMaisAtivos?: Observable<SelecionarMedicosMaisAtivosResponse>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private medicosService: MedicosService
  ) {}

  ngOnInit(): void {
    this.dados = this.route.snapshot.data['dados'];
  }

  abrirDialog(): void {
    const dialogRef = this.dialog.open(MedicosMaisAtivosDialogComponent, {
      disableClose: true,
    });

    this.medicosMaisAtivos = dialogRef
      .afterClosed()
      .pipe(
        switchMap((dados) =>
          this.medicosService.selecionarMedicosMaisAtivos(dados)
        )
      );
  }
}

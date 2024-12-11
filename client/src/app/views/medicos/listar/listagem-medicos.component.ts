import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SelecionarMedicosResponse } from '../medicos.models';

@Component({
  selector: 'app-listagem-medicos',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dados = this.route.snapshot.data['dados'];
  }
}

import { Component, OnInit } from '@angular/core';
import { SelecionarMedicoPorIdResponse } from '../medicos.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MedicosService } from '../medicos.service';
import { DetalhesMedicoComponent } from '../shared/detalhes/detalhes-medico.component';

@Component({
  selector: 'app-visualizacao-medico',
  standalone: true,
  imports: [
    RouterLink,
    
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,

    DetalhesMedicoComponent,
  ],
  templateUrl: './visualizacao-medico.component.html',
})
export class VisualizacaoMedicoComponent implements OnInit {
  detalhes!: SelecionarMedicoPorIdResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicosService: MedicosService
  ) {}

  ngOnInit(): void {
    this.detalhes = this.route.snapshot.data['dados'];
  }
}

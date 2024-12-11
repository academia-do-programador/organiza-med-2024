import { Component, OnInit } from '@angular/core';
import { SelecionarMedicoPorIdResponse } from '../medicos.models';
import { MedicosService } from '../medicos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetalhesMedicoComponent } from '../shared/detalhes/detalhes-medico.component';

@Component({
  selector: 'app-exclusao-medico',
  standalone: true,
  imports: [
    RouterLink,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,

    DetalhesMedicoComponent,
  ],
  templateUrl: './exclusao-medico.component.html',
})
export class ExclusaoMedicoComponent implements OnInit {
  detalhes!: SelecionarMedicoPorIdResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicosService: MedicosService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.detalhes = this.route.snapshot.data['dados'];
  }

  public excluir() {
    this.medicosService.excluir(this.detalhes.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Médico(a) excluído(a) com sucesso!');

    this.router.navigate(['/medicos', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}

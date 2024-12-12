import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SelecionarAtividadeMedicaPorIdResponse } from '../atividades-medicas.models';
import { AtividadesMedicasService } from '../atividades-medicas.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { DetalhesAtividadeMedicaComponent } from '../shared/detalhes/detalhes-atividade-medica.component';

@Component({
  selector: 'app-exclusao-atividade-medica',
  standalone: true,
  imports: [
    RouterLink,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,

    DetalhesAtividadeMedicaComponent,
  ],
  templateUrl: './exclusao-atividade-medica.component.html',
})
export class ExclusaoAtividadeMedicaComponent implements OnInit {
  detalhes!: SelecionarAtividadeMedicaPorIdResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private atividadesMedicasService: AtividadesMedicasService,
    private notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.detalhes = this.route.snapshot.data['dados'];
  }

  public excluir() {
    this.atividadesMedicasService.excluir(this.detalhes.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Atividade Médica excluída com sucesso!');

    this.router.navigate(['/atividades-medicas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}

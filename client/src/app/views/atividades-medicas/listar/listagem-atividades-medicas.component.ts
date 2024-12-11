import { DatePipe, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  SelecionarAtividadesMedicasDto,
  SelecionarAtividadesMedicasResponse,
  TipoAtividadeMedica,
} from '../atividades-medicas.models';
import { SelecionarMedicosDto } from '../../medicos/medicos.models';
import { MatChipsModule } from '@angular/material/chips';

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
    MatChipsModule,
  ],
  templateUrl: './listagem-atividades-medicas.component.html',
})
export class ListagemConsultasComponent implements OnInit {
  dados!: SelecionarAtividadesMedicasResponse;
  tiposAtividade = Object.values(TipoAtividadeMedica).filter(
    (v) => !Number.isFinite(v)
  );

  dadosEmCache!: SelecionarAtividadesMedicasResponse;
  filtroEmCache?: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dados = this.route.snapshot.data['dados'];

    this.dadosEmCache = this.dados;

    const tipoAtividade = this.route.snapshot.queryParams['tipoAtividade'];

    if (tipoAtividade) {
      this.filtrar(tipoAtividade);

      this.filtroEmCache = tipoAtividade;
    }
  }

  public listarMedicosAtividade(medicos: SelecionarMedicosDto[]): string {
    return medicos.map((m) => m.nome).join(', ');
  }

  public filtrar(indexTipoAtividade?: number) {
    const registrosFiltrados = this.obterRegistrosFiltrados(
      this.dadosEmCache.registros,
      indexTipoAtividade
    );

    this.dados = {
      quantidadadeRegistros: registrosFiltrados.length,
      registros: registrosFiltrados,
    };
  }

  private obterRegistrosFiltrados(
    registros: SelecionarAtividadesMedicasDto[],
    indexTipoAtividade?: number
  ) {
    if (indexTipoAtividade != undefined) {
      return registros.filter((n) => n.tipoAtividade == indexTipoAtividade);
    }

    return registros;
  }
}

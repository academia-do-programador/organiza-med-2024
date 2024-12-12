import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { Observable, Subscription, map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { parse } from 'date-fns';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { AtividadesMedicasService } from '../atividades-medicas.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { SelecionarMedicosDto } from '../../medicos/medicos.models';
import {
  TipoAtividadeMedica,
  SelecionarAtividadeMedicaPorIdResponse,
  EditarAtividadeMedicaPartialRequest,
} from '../atividades-medicas.models';

@Component({
  selector: 'app-edicao-atividade-medica',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,

    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './edicao-atividade-medica.component.html',
})
export class EdicaoAtividadeMedicaComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  public medicos$!: Observable<SelecionarMedicosDto[]>;

  public medicosSelecionados: SelecionarMedicosDto[] = [];
  public tipoAtividadeSelecionada?: TipoAtividadeMedica;

  public opcoesAtividade = Object.values(TipoAtividadeMedica).filter(
    (v) => !Number.isFinite(v)
  );

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private atividadeMedicasService: AtividadesMedicasService,
    private notificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      inicio: [new Date().toLocaleString('pt-Br'), [Validators.required]],
      termino: [new Date().toLocaleString('pt-Br'), [Validators.required]],
      medicos: [[], [Validators.required]],
    });
  }

  get inicio() {
    return this.form.get('inicio');
  }

  get termino() {
    return this.form.get('termino');
  }

  get medicos() {
    return this.form.get('medicos');
  }

  ngOnInit(): void {
    this.medicos$ = this.route.data.pipe(
      map((data) => data['medicos'].registros)
    );

    const atividadeSelecionada = this.route.snapshot.data[
      'dados'
    ] as SelecionarAtividadeMedicaPorIdResponse;

    this.form.patchValue({
      inicio: new Date(atividadeSelecionada.inicio).toLocaleString('pt-Br'),
      termino: new Date(atividadeSelecionada.termino).toLocaleString('pt-Br'),
      medicos: atividadeSelecionada.medicos.map(
        (m: SelecionarMedicosDto) => m.id
      ),
    });

    this.tipoAtividadeSelecionada = atividadeSelecionada.tipoAtividade;

    if (this.tipoAtividadeSelecionada === TipoAtividadeMedica.Consulta) {
      this.medicos?.addValidators(Validators.maxLength(1));
    } else {
      this.medicos?.removeValidators(Validators.maxLength(1));
    }
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente!'
      );

      return;
    }

    const request: EditarAtividadeMedicaPartialRequest = {
      ...this.form.value,
      inicio: parse(
        this.inicio?.value,
        'dd/MM/yyyy, HH:mm:ss',
        new Date().toISOString()
      ),
      termino: parse(
        this.termino?.value,
        'dd/MM/yyyy, HH:mm:ss',
        new Date().toISOString()
      ),
    };

    const id = this.route.snapshot.params['id'];

    this.atividadeMedicasService.editar(id, request).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso(`Atividade médica editada com sucesso!`);

    this.router.navigate(['/atividades-medicas', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }
}

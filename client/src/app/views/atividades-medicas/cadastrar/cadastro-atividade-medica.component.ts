import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import {
  InserirMedicoRequest,
  SelecionarMedicosDto,
  SelecionarMedicosResponse,
} from '../../medicos/medicos.models';
import { MedicosService } from '../../medicos/medicos.service';
import { AtividadesMedicasService } from '../atividades-medicas.service';
import {
  InserirAtividadeMedicaRequest,
  TipoAtividadeMedica,
} from '../atividades-medicas.models';
import { filter, map, Observable, Subscription, tap } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { parse } from 'date-fns';

@Component({
  selector: 'app-cadastro-atividade-medica',
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
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro-atividade-medica.component.html',
})
export class CadastroAtividadeMedicaComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  public medicos$!: Observable<SelecionarMedicosDto[]>;

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
      termino: [],
      tipoAtividade: [0, [Validators.required]],
      medicos: [[], Validators.required],
    });
  }

  get inicio() {
    return this.form.get('inicio');
  }

  get termino() {
    return this.form.get('termino');
  }

  get tipoAtividade() {
    return this.form.get('tipoAtividade');
  }

  get medicos() {
    return this.form.get('medicos');
  }

  ngOnInit(): void {
    this.medicos$ = this.route.data.pipe(
      map((data) => data['medicos'].registros)
    );

    this.subscriptions.push(
      this.tipoAtividade!.valueChanges.subscribe(() => {
        this.medicos!.setValue([]);

        this.notificacaoService.aviso(
          'Você precisa selecionar o(s) médico(s) novamente após mudar o tipo de atividade.'
        );
      })
    );
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

    const medicosFormatados = Array.isArray(this.medicos?.value)
      ? [...this.medicos?.value]
      : [this.medicos?.value];

    const request: InserirAtividadeMedicaRequest = {
      ...this.form.value,
      inicio: parse(
        this.inicio?.value,
        'dd/MM/yyyy, HH:mm:ss',
        new Date().toISOString()
      ),
      termino:
        this.termino?.value != null
          ? parse(
              this.termino?.value,
              'dd/MM/yyyy, HH:mm:ss',
              new Date().toISOString()
            )
          : undefined,
      medicos: medicosFormatados,
    };

    this.atividadeMedicasService.inserir(request).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso(`Atividade Médica cadastrada com sucesso!`);

    this.router.navigate(['/atividades-medicas', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }
}

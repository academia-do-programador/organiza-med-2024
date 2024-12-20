import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

import { map, Observable, startWith, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { parse } from 'date-fns';

import { AtividadesMedicasService } from '../atividades-medicas.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { SelecionarMedicosDto } from '../../medicos/medicos.models';
import {
  InserirAtividadeMedicaRequest,
  TipoAtividadeMedica,
} from '../atividades-medicas.models';

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
      termino: [new Date().toLocaleString('pt-Br'), [Validators.required]],
      tipoAtividade: [0, [Validators.required]],
      medicos: [[], [Validators.required]],
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
      this.tipoAtividade!.valueChanges.pipe(startWith(0)).subscribe((v) => {
        if (v === TipoAtividadeMedica.Consulta) {
          this.medicos?.setValidators([
            Validators.required,
            Validators.maxLength(1),
          ]);
        } else {
          this.medicos?.setValidators([Validators.required]);
        }

        this.medicos?.updateValueAndValidity();
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
      termino: parse(
        this.termino?.value,
        'dd/MM/yyyy, HH:mm:ss',
        new Date().toISOString()
      ),
      medicos: medicosFormatados,
    };

    this.atividadeMedicasService.inserir(request).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso(`Atividade médica cadastrada com sucesso!`);

    this.router.navigate(['/atividades-medicas', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }
}

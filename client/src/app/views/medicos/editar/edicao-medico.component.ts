import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { InserirMedicoRequest } from '../medicos.models';
import { MedicosService } from '../medicos.service';

@Component({
  selector: 'app-edicao-medico',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,

    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './edicao-medico.component.html',
})
export class EdicaoMedicoComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private medicosService: MedicosService,
    private notificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      crm: ['', [Validators.required, Validators.pattern(/^\d{5}-[A-Z]{2}$/)]],
    });
  }

  get nome() {
    return this.form.get('nome');
  }

  get crm() {
    return this.form.get('crm');
  }

  ngOnInit(): void {
    const dados = this.route.snapshot.data['dados'];

    this.form.patchValue(dados);
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente!'
      );

      return;
    }

    const id = this.route.snapshot.params['id'];

    const request = this.form.value as InserirMedicoRequest;

    this.medicosService.editar(id, request).subscribe({
      next: (contatoInserido) => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso(`Médico(a) editado(a) com sucesso!`);

    this.router.navigate(['/medicos', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }
}

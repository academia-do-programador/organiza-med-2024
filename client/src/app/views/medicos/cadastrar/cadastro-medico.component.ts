import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MedicosService } from '../medicos.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { InserirMedicoRequest } from '../medicos.models';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-cadastro-medico',
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
  templateUrl: './cadastro-medico.component.html',
})
export class CadastroMedicoComponent {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
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

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, preencha o formulário corretamente!'
      );

      return;
    }

    const request = this.form.value as InserirMedicoRequest;

    this.medicosService.inserir(request).subscribe({
      next: (contatoInserido) => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso(`Médico(a) cadastrado(a) com sucesso!`);

    this.router.navigate(['/medicos', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }
}

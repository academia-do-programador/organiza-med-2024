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
import { AuthService } from '../../services/auth.service';
import {
  RegistrarUsuarioRequest,
  TokenResponse,
} from '../../models/auth.models';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private notificacaoService: NotificacaoService,
    private localStorageService: LocalStorageService
  ) {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get userName() {
    return this.form.get('userName');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  public registrar() {
    if (this.form.invalid) return;

    const registro: RegistrarUsuarioRequest = this.form.value;

    this.authService.registrar(registro).subscribe({
      next: (usuarioAutenticado) => this.processarSucesso(usuarioAutenticado),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(token: TokenResponse): void {
    this.usuarioService.logarUsuario(token.usuario);
    this.localStorageService.salvarTokenAutenticacao(token);
    this.router.navigate(['/dashboard']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
    this.localStorageService.limparDadosLocais();
  }
}

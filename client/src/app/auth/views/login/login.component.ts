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
import {
  AutenticarUsuarioRequest,
  TokenResponse,
} from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private notificacaoService: NotificacaoService
  ) {
    this.form = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  get userName() {
    return this.form.get('userName');
  }

  get password() {
    return this.form.get('password');
  }

  public entrar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso(
        'Por favor, corrija os campos inválidos do formulário.'
      );

      return;
    }

    const loginUsuario: AutenticarUsuarioRequest = this.form.value;

    this.authService.login(loginUsuario).subscribe({
      next: (res: TokenResponse) => this.processarSucesso(res),
      error: (erro: Error) => this.processarFalha(erro),
    });
  }

  private processarSucesso(res: TokenResponse) {
    this.usuarioService.logarUsuario(res.usuario);
    this.localStorageService.salvarTokenAutenticacao(res);

    this.router.navigate(['/dashboard']);
  }

  private processarFalha(err: Error) {
    this.notificacaoService.erro(err.message);
  }
}

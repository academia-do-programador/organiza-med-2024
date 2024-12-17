import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PeriodoMedicosMaisAtivosDto } from '../../medicos.models';
import { parse } from 'date-fns';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-medicos-mais-ativos-dialog',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,

    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: 'medicos-mais-ativos-dialog.component.html',
})
export class MedicosMaisAtivosDialogComponent {
  public readonly form: FormGroup;

  readonly dialogRef = inject(MatDialogRef<MedicosMaisAtivosDialogComponent>);

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      inicioPeriodo: [
        new Date().toLocaleString('pt-Br'),
        [Validators.required],
      ],
      terminoPeriodo: [
        new Date().toLocaleString('pt-Br'),
        [Validators.required],
      ],
    });
  }

  get inicioPeriodo() {
    return this.form.get('inicioPeriodo');
  }

  get terminoPeriodo() {
    return this.form.get('terminoPeriodo');
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): PeriodoMedicosMaisAtivosDto {
    return {
      inicioPeriodo: parse(
        this.inicioPeriodo?.value,
        'dd/MM/yyyy, HH:mm:ss',
        new Date()
      ).toISOString(),
      terminoPeriodo: parse(
        this.terminoPeriodo?.value,
        'dd/MM/yyyy, HH:mm:ss',
        new Date()
      ).toISOString(),
    };
  }
}

import {Component, inject, signal} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {
  MatError,
  MatFormField,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  MatSuffix
} from '@angular/material/input';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-investimentos',
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatPrefix,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './investimentos.html',
  styleUrl: './investimentos.scss',
  standalone: true
})
export class Investimentos {
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    categoria: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0, [Validators.required]]
  });

  tipos = signal<String[]>([]);

  ngOnInit(): void {
    this.tipos = signal(['Acoes', 'Fundo Imobiliario', 'Renda Fixa', 'Previdencia Privada', 'CDB', 'FGTS', 'Tesouro Direto', 'Fundo de Investimento']);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

}

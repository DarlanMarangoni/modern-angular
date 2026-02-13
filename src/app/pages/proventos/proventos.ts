import {Component, inject, OnInit, signal} from '@angular/core';
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
import {Category} from '../../shared/service/category.service';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ProventosService} from '../../shared/service/proventos.service';

@Component({
  selector: 'app-proventos',
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
  templateUrl: './proventos.html',
  styleUrl: './proventos.scss',
})
export class Proventos implements OnInit {
  fb = inject(FormBuilder);

  proventosService = inject(ProventosService);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0, [Validators.required]]
  });

  tipos = signal<String[]>([]);

  ngOnInit(): void {
    this.tipos = signal(['Acoes', 'Fundo Imobiliario', 'Renda Fixa']);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.proventosService.salvar({
      id: null,
      name: this.form.getRawValue().nome,
      description: this.form.getRawValue().descricao,
      value: this.form.getRawValue().valor,
      date: this.form.getRawValue().data.toLocaleDateString('en-CA', {
        timeZone: 'America/Sao_Paulo'
      }),
      type: this.form.getRawValue().tipo,
      userId: '0199812b-ee85-74a1-8bb3-05d2185f93fc'
    }).subscribe({
      next: () => {
        this.form.reset({
          nome: ' ',
          tipo: ' ',
          descricao: '',
          data: new Date(),
          valor: 0
        });
        this.form.clearValidators();
      },
      error: () => alert('Erro ao salvar')
    });
  }
}

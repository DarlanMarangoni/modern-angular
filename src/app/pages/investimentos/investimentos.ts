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
import {MatFormFieldModule} from '@angular/material/form-field';
import {InvestimentosServices} from '../../shared/service/investimentos.services';

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
export class Investimentos implements OnInit{
  fb = inject(FormBuilder);

  investimentosService = inject(InvestimentosServices);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0],
    quantidade: [0]
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
    this.investimentosService.salvar({
      name: this.form.getRawValue().nome,
      description: this.form.getRawValue().descricao,
      type: this.form.getRawValue().tipo,
      totalValue: this.form.getRawValue().valor,
      amount: this.form.getRawValue().quantidade,
      date: this.form.getRawValue().data,
      userId: '0199812b-ee85-74a1-8bb3-05d2185f93fc'
    });

  }

}

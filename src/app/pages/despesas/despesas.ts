import {Component, inject} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './despesas.html',
  styleUrls: ['./despesas.scss']
})
export class DespesasComponent {

  categorias = [
    'Alimentação',
    'Moradia',
    'Transporte',
    'Lazer',
    'Saúde',
    'Educação',
    'Outros'
  ];

  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    categoria: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0, [Validators.required, Validators.min(0.01)]]
  });

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Despesa:', this.form.getRawValue());
  }
}

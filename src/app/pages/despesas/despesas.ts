import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {Category, CategoryService} from '../../shared/service/category.service';
import {DespesasService} from '../../shared/service/despesas.service';

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
export class DespesasComponent implements OnInit {

  fb = inject(FormBuilder);
  categoriesService = inject(CategoryService);
  despesasService = inject(DespesasService);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    categoria: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0, [Validators.required, Validators.min(0.01)]]
  });

  categorias = signal<Category[]>([]);

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe({
        next: value => this.categorias.set(value)
      });
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.despesasService.salvar({
      id: null,
      name: this.form.getRawValue().nome,
      category: this.form.getRawValue().categoria,
      date: this.form.getRawValue().data,
      description: this.form.getRawValue().descricao,
      value: this.form.getRawValue().valor
    }).subscribe({
      next: () => this.form.reset(),
      error: () => alert('Erro ao salvar')
    });
  }



}

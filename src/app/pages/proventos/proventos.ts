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
import {Provento, ProventosService} from '../../shared/service/proventos.service';
import {Table} from '../../shared/components/table/table';

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
    MatNativeDateModule,
    Table
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

  proventos = signal<Provento[]>([]);

  ngOnInit(): void {
    this.tipos = signal(['Acoes', 'Fundo Imobiliario', 'Renda Fixa']);
    this.buscaProventos();
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

        this.buscaProventos();
      },
      error: () => alert('Erro ao salvar')
    });

  }

  protected deleteById($event: any) {
    this.proventosService.deleteById($event).subscribe({
      next: () => this.buscaProventos(),
      error: () => alert('Erro ao deletar')
    });
    this.buscaProventos();
  }

  private buscaProventos() {
    this.proventosService.findAll()
      .subscribe({
        next: value => {
          this.proventos.set(value);
        },
        error: () => alert('Erro ao carregar despesas')
      });
  }
}

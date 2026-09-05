import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {DatePicker} from 'primeng/datepicker';
import {InputNumber} from 'primeng/inputnumber';
import {FloatLabel} from 'primeng/floatlabel';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {IncomeDto, Provento, ProventosService} from '../../shared/service/proventos.service';
import {Table} from '../../shared/components/table/table';

@Component({
  selector: 'app-proventos',
  imports: [
    ReactiveFormsModule,
    InputText,
    Select,
    DatePicker,
    InputNumber,
    FloatLabel,
    Message,
    Button,
    Table
  ],
  templateUrl: './proventos.html',
  styleUrl: './proventos.scss',
})
export class Proventos implements OnInit {
  fb = inject(FormBuilder);

  proventosService = inject(ProventosService);

  messageService = inject(MessageService);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    descricao: [''],
    data: [new Date(), Validators.required],
    valor: [0, [Validators.required]]
  });

  tipos = signal<string[]>([]);

  proventos = signal<Provento[]>([]);

  page = signal(0);

  totalRecords = signal(0);

  editingId = signal<string | null>(null);

  ngOnInit(): void {
    this.tipos.set(['Acoes', 'Fundo Imobiliario', 'Renda Fixa']);
    this.buscaProventos();
  }

  protected onPageChange({page, size}: { page: number; size: number }) {
    this.buscaProventos(page, size);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: IncomeDto = {
      name: this.form.getRawValue().nome,
      description: this.form.getRawValue().descricao,
      value: this.form.getRawValue().valor,
      date: this.form.getRawValue().data.toLocaleDateString('en-CA', {
        timeZone: 'America/Sao_Paulo'
      }),
      type: this.form.getRawValue().tipo
    };

    const editingId = this.editingId();
    const request = editingId
      ? this.proventosService.update(editingId, dto)
      : this.proventosService.salvar({id: null, ...dto});

    request.subscribe({
      next: () => {
        this.cancelarEdicao();
        this.buscaProventos();
      },
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao salvar provento'})
    });
  }

  protected editar(id: string) {
    this.proventosService.findById(id).subscribe({
      next: provento => {
        this.form.setValue({
          nome: provento.name,
          tipo: provento.type,
          descricao: provento.description ?? '',
          // provento.date is a plain 'yyyy-MM-dd' string — parse as local midnight, not UTC,
          // or the datepicker shows the previous day for timezones behind UTC.
          data: new Date(`${provento.date}T00:00:00`),
          valor: provento.value
        });
        this.editingId.set(id);
      },
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar provento'})
    });
  }

  protected cancelarEdicao() {
    this.form.reset({
      nome: ' ',
      tipo: ' ',
      descricao: '',
      data: new Date(),
      valor: 0
    });
    this.form.clearValidators();
    this.editingId.set(null);
  }

  protected deleteById(id: string) {
    this.proventosService.deleteById(id).subscribe({
      next: () => this.buscaProventos(),
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao deletar provento'})
    });
  }

  private buscaProventos(page = this.page(), size = 10) {
    this.proventosService.findAll(page, size)
      .subscribe({
        next: response => {
          this.proventos.set(response.content);
          this.totalRecords.set(response.totalElements);
          this.page.set(response.page);
        },
        error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar proventos'})
      });
  }
}

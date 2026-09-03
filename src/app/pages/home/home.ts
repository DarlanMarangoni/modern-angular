import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import {SelectButtonModule} from 'primeng/selectbutton';
import {MessageService} from 'primeng/api';
import {ProventosService, YearMonth} from '../../shared/service/proventos.service';
import {InvestimentosServices} from '../../shared/service/investimentos.services';
import {DespesasService, ExpenseYearMonth} from '../../shared/service/despesas.service';
import {ThemeService} from '../../shared/service/theme.service';

type Period = 'monthly' | 'yearly';

interface Series {
  month: string;
  value: number;
}

const MONTH_LABEL_FORMATTER = new Intl.DateTimeFormat('pt-BR', {month: 'short', year: '2-digit'});
const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});
const COMPACT_CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL', notation: 'compact', maximumFractionDigits: 1
});

// Categorical palette (dataviz skill, slots 1/2/3 — validated CVD-safe as a set). The "Fluxo" stat tile uses
// slot 7 (violet) as a one-off accent in home.scss — it never shares a legend/chart with the other three.
const INCOME_COLOR = {light: '#2a78d6', dark: '#3987e5'};
const EXPENSE_COLOR = {light: '#eb6834', dark: '#d95926'};
const INVESTMENT_COLOR = {light: '#1baf7a', dark: '#199e70'};

function formatMonthLabel(yearMonth: string): string {
  const [year, month] = yearMonth.split('-').map(Number);
  const label = MONTH_LABEL_FORMATTER.format(new Date(year, month - 1, 1));
  return label.charAt(0).toUpperCase() + label.slice(1).replace('.', '');
}

function toMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function previousMonthKey(monthKey: string): string {
  const [year, month] = monthKey.split('-').map(Number);
  return toMonthKey(new Date(year, month - 2, 1));
}

function computeDelta(current: number, previous: number | undefined): number | null {
  if (previous === undefined || previous === 0) {
    return null;
  }
  return ((current - previous) / Math.abs(previous)) * 100;
}

@Component({
  selector: 'app-home',
  imports: [
    ChartModule,
    SelectButtonModule,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home implements OnInit {

  proventosService = inject(ProventosService);

  investimentoService = inject(InvestimentosServices);

  despesasService = inject(DespesasService);

  messageService = inject(MessageService);

  themeService = inject(ThemeService);

  periodo = signal<Period>('monthly');

  periodOptions: {label: string; value: Period}[] = [
    {label: 'Mensal', value: 'monthly'},
    {label: 'Anual', value: 'yearly'}
  ];

  private readonly currentMonthKey = toMonthKey(new Date());

  private readonly previousMonthKeyValue = previousMonthKey(this.currentMonthKey);

  private proventosRaw = signal<YearMonth[]>([]);

  private despesasRaw = signal<ExpenseYearMonth[]>([]);

  private investimentosRaw = signal<YearMonth[]>([]);

  private proventosSeries = computed<Series[]>(() => this.proventosRaw().map(p => ({month: p.month, value: p.value})));

  private despesasSeries = computed<Series[]>(() => this.despesasRaw().map(d => ({month: d.month, value: d.total})));

  private investimentosSeries = computed<Series[]>(() =>
    this.investimentosRaw().slice().sort((a, b) => a.month.localeCompare(b.month)).map(i => ({month: i.month, value: i.value}))
  );

  proventosChartData = computed(() => this.buildChartData(this.proventosSeries(), 'Proventos', 'sum', INCOME_COLOR));

  despesasChartData = computed(() => this.buildChartData(this.despesasSeries(), 'Despesas', 'sum', EXPENSE_COLOR));

  investimentosChartData = computed(() => this.buildChartData(this.investimentosSeries(), 'Investimentos', 'last', INVESTMENT_COLOR));

  chartOptions = computed(() => this.buildChartOptions());

  proventosMesAtual = computed(() => this.proventosRaw().find(p => p.month === this.currentMonthKey)?.value ?? 0);

  private proventosMesAnterior = computed(() => this.proventosRaw().find(p => p.month === this.previousMonthKeyValue)?.value);

  despesasMesAtual = computed(() => this.despesasRaw().find(d => d.month === this.currentMonthKey)?.total ?? 0);

  private despesasMesAnterior = computed(() => this.despesasRaw().find(d => d.month === this.previousMonthKeyValue)?.total);

  fluxoMesAtual = computed(() => this.proventosMesAtual() - this.despesasMesAtual());

  private fluxoMesAnterior = computed(() => {
    const proventos = this.proventosMesAnterior();
    const despesas = this.despesasMesAnterior();
    return proventos === undefined && despesas === undefined ? undefined : (proventos ?? 0) - (despesas ?? 0);
  });

  private totalInvestidoEntry = computed(() => {
    const series = this.investimentosSeries();
    const known = series.filter(i => i.month <= this.currentMonthKey);
    return known.length ? known[known.length - 1] : series[0];
  });

  private totalInvestidoAnteriorEntry = computed(() => {
    const series = this.investimentosSeries();
    const atual = this.totalInvestidoEntry();
    const index = atual ? series.findIndex(i => i.month === atual.month) : -1;
    return index > 0 ? series[index - 1] : undefined;
  });

  totalInvestidoAtual = computed(() => this.totalInvestidoEntry()?.value ?? 0);

  private totalInvestidoAnterior = computed(() => this.totalInvestidoAnteriorEntry()?.value);

  deltaProventos = computed(() => computeDelta(this.proventosMesAtual(), this.proventosMesAnterior()));

  deltaDespesas = computed(() => computeDelta(this.despesasMesAtual(), this.despesasMesAnterior()));

  deltaFluxo = computed(() => computeDelta(this.fluxoMesAtual(), this.fluxoMesAnterior()));

  deltaInvestido = computed(() => computeDelta(this.totalInvestidoAtual(), this.totalInvestidoAnterior()));

  ngOnInit() {
    this.proventosService.listByMonth()
      .subscribe({
        next: (proventos) => this.proventosRaw.set(proventos),
        error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar proventos'})
      });

    this.despesasService.listByMonth()
      .subscribe({
        next: (despesas) => this.despesasRaw.set(despesas),
        error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar despesas'})
      });

    this.investimentoService.listByMonth()
      .subscribe({
        next: (investimentos) => this.investimentosRaw.set(investimentos),
        error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao carregar investimentos'})
      });
  }

  formatCompact(value: number): string {
    return COMPACT_CURRENCY_FORMATTER.format(value);
  }

  formatDelta(delta: number | null): string {
    if (delta === null) {
      return '—';
    }
    return `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`;
  }

  statClass(delta: number | null, goodWhenPositive: boolean): 'positive' | 'negative' | 'neutral' {
    if (delta === null) {
      return 'neutral';
    }
    return (delta >= 0) === goodWhenPositive ? 'positive' : 'negative';
  }

  private chartInk() {
    const isDark = this.themeService.isDark();
    const style = getComputedStyle(document.documentElement);
    const cssVar = (name: string, fallback: string) => style.getPropertyValue(name)?.trim() || fallback;
    return {
      muted: cssVar('--p-text-muted-color', '#898781'),
      grid: cssVar('--p-content-border-color', isDark ? '#2c2c2a' : '#e1e0d9'),
    };
  }

  private aggregate(series: Series[], mode: 'sum' | 'last'): {label: string; value: number}[] {
    if (this.periodo() === 'monthly') {
      return series
        .slice()
        .sort((a, b) => a.month.localeCompare(b.month))
        .map(s => ({label: formatMonthLabel(s.month), value: s.value}));
    }

    const byYear = new Map<string, Series[]>();
    for (const item of series) {
      const year = item.month.split('-')[0];
      if (!byYear.has(year)) {
        byYear.set(year, []);
      }
      byYear.get(year)!.push(item);
    }

    return Array.from(byYear.keys())
      .sort()
      .map(year => {
        const items = byYear.get(year)!.slice().sort((a, b) => a.month.localeCompare(b.month));
        const value = mode === 'sum'
          ? items.reduce((acc, i) => acc + i.value, 0)
          : items[items.length - 1].value;
        return {label: year, value};
      });
  }

  private buildChartData(series: Series[], label: string, mode: 'sum' | 'last', color: {light: string; dark: string}) {
    const points = this.aggregate(series, mode);
    const isDark = this.themeService.isDark();

    return {
      labels: points.map(p => p.label),
      datasets: [{
        label,
        data: points.map(p => p.value),
        backgroundColor: isDark ? color.dark : color.light,
        borderRadius: {topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0},
        borderSkipped: false,
        maxBarThickness: 24
      }]
    };
  }

  private buildChartOptions() {
    const {muted, grid} = this.chartInk();
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {display: false},
        tooltip: {
          callbacks: {
            label: (ctx: any) => `${ctx.dataset.label}: ${CURRENCY_FORMATTER.format(ctx.parsed.y)}`
          }
        }
      },
      scales: {
        x: {
          grid: {display: false},
          border: {color: grid},
          ticks: {color: muted}
        },
        y: {
          beginAtZero: true,
          border: {display: false},
          grid: {color: grid},
          ticks: {
            color: muted,
            callback: (value: number) => COMPACT_CURRENCY_FORMATTER.format(value)
          }
        }
      }
    };
  }
}

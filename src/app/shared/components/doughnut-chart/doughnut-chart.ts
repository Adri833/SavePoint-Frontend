import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export interface DoughnutData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-doughnut-chart',
  imports: [CommonModule],
  templateUrl: './doughnut-chart.html',
  styleUrls: ['./doughnut-chart.scss'],
})
export class DoughnutChart implements AfterViewInit, OnChanges {
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() loading = false;
  @Input() set games(value: { gameName: string; hours: number }[]) {
    this._games = value;
    if (value && value.length > 0) {
      this.handleDataChange();
    }
  }

  get games() {
    return this._games;
  }

  private _games: { gameName: string; hours: number }[] = [];

  private handleDataChange() {
    if (this.chart) {
      this.updateChart();
    } else if (this.doughnutCanvas) {
      this.createChart(this._games);
    }
  }

  private chart!: Chart;

  ngAfterViewInit() {
    requestAnimationFrame(() => this.createChart(this.games));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['loading'] && !this.loading) {
      setTimeout(() => {
        if (!this.chart && this.doughnutCanvas) {
          this.createChart(this.games);
        }
      });
    }
  }

  private createChart(games: { gameName: string; hours: number }[]) {
    const validGames = this.games.filter((g) => g.hours > 0).sort((a, b) => b.hours - a.hours);
    const hasData = validGames.length > 0;

    this.chart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: hasData ? validGames.map((g) => g.gameName) : ['Sin datos'],
        datasets: [
          {
            data: hasData ? validGames.map((g) => g.hours) : [1],
            backgroundColor: hasData ? this.generateColors(validGames.length) : ['#2f2f2f'],
            borderWidth: 0,
            hoverOffset: hasData ? 4 : 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        layout: { padding: 10 },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: hasData,
            callbacks: {
              label: (context) => {
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const value = Number(context.raw);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${value}h (${percentage}%)`;
              },
            },
          },
        },
      },
      plugins: [
        {
          id: 'centerText',
          beforeDraw: (chart) => {
            const { width, height, ctx } = chart;
            const data = chart.data.datasets[0].data as number[];
            const labels = chart.data.labels as string[];

            const isEmpty = labels.length === 1 && labels[0] === 'Sin datos';

            const totalHours = isEmpty ? 0 : data.reduce((a, b) => a + b, 0);
            const totalGames = isEmpty ? 0 : data.filter((d) => d > 0).length;
            ctx.save();

            // === Horas totales ===
            const hoursFontSize = height / 9;
            ctx.font = `${hoursFontSize}px sans-serif`;
            ctx.textBaseline = 'middle';
            ctx.fillStyle = totalGames > 0 ? '#ffffff' : '#777777';

            const hoursText = `${totalHours}h`;
            const hoursX = width / 2 - ctx.measureText(hoursText).width / 2;
            const hoursY = height / 2 - 20;

            ctx.fillText(hoursText, hoursX, hoursY);

            // === Numero de juegos ===
            const gamesFontSize = height / 16;
            ctx.font = `${gamesFontSize}px sans-serif`;
            ctx.fillStyle = '#aaa';

            const gamesText = `${totalGames} ${totalGames === 1 ? 'juego' : 'juegos'}`;
            const gamesX = width / 2 - ctx.measureText(gamesText).width / 2;
            const gamesY = hoursY + 50;

            ctx.fillText(gamesText, gamesX, gamesY);

            ctx.restore();
          },
        },
      ],
    });
  }

  private updateChart() {
    if (!this.chart) return;
    this.chart.data.labels = this.games.map((g) => g.gameName);
    this.chart.data.datasets[0].data = this.games.map((g) => g.hours);
    this.chart.data.datasets[0].backgroundColor = this.generateColors(this.games.length);
    this.chart.update();
  }

  private generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = Math.round((360 / count) * i);
      colors.push(`hsl(${hue}, 70%, 55%)`);
    }
    return colors;
  }
}

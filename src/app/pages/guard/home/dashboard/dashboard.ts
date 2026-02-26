import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { DashboardService } from '../../../../services/dashboard.service';
import { DoughnutChart } from '../../../../shared/components/doughnut-chart/doughnut-chart';
import { CompletedStats } from '../../../../shared/components/completed-stats/completed-stats';
import { PlatinumStats } from "../../../../shared/components/platinum-stats/platinum-stats";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DoughnutChart, CompletedStats, PlatinumStats],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  gamesData: { gameName: string; hours: number }[] = [];

  completedGames = 0;
  abandonedGames = 0;
  platinumGames = 0;

  isLoading = true;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    this.isLoading = true;

    try {
      const currentYear = new Date().getFullYear();

      const stats = await this.dashboardService.getStatsByYear(currentYear);

      this.completedGames = stats.completedCount;
      this.abandonedGames = stats.abandonedCount;
      this.platinumGames = stats.totalPlatinum;

      this.gamesData = await this.dashboardService.getHoursByGameForYear(currentYear);
    } catch (error) {
      console.error('Error loading dashboard data', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}

import { Injectable } from '@angular/core';
import { PlaythroughService } from './playtrough.service';
import { Playthrough } from '../models/playtrough.model';
import { DashboardStats } from '../models/dashboard-stats.model';
import { GamesService } from './games.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private playthroughService: PlaythroughService,
    private gamesService: GamesService,
  ) {}

  async getStatsByYear(year: number): Promise<DashboardStats> {
    const playthroughs = await this.playthroughService.getAllByUser();

    const filtered = this.filterByYear(playthroughs, year);

    const finished = filtered.filter((p) => p.status === 'finished');

    const completed = finished.filter((p) => p.completed);

    const abandoned = finished.filter((p) => !p.completed);

    const totalFinished = completed.length;
    const totalPlatinum = completed.filter((p) => p.platinum).length;

    const totalHours = filtered.reduce((acc, p) => acc + (p.hours ?? 0), 0);

    const abandonmentRate = finished.length === 0 ? 0 : (abandoned.length / finished.length) * 100;

    return {
      year,
      totalFinished,
      totalPlatinum,
      totalHours,
      completedCount: completed.length,
      abandonedCount: abandoned.length,
      abandonmentRate,
    };
  }

  async getHoursByGameForYear(year: number): Promise<{ gameName: string; hours: number }[]> {
    const playthroughs = await this.playthroughService.getAllByUser();
    const filtered = this.filterByYear(playthroughs, year);

    const map = new Map<number, number>();

    filtered.forEach((p) => {
      const gameId = p.game_id;
      const hours = p.hours ?? 0;
      map.set(gameId, (map.get(gameId) ?? 0) + hours);
    });

    const entries = Array.from(map.entries());

    const games = await Promise.all(
      entries.map(async ([gameId, hours]) => {
        try {
          const game = await firstValueFrom(this.gamesService.getGameById(gameId));
          return {
            gameName: game.name,
            hours,
          };
        } catch {
          return {
            gameName: 'Unknown',
            hours,
          };
        }
      }),
    );

    return games;
  }

  /* ========== HELPERS ========== */

  private filterByYear(playthroughs: Playthrough[], year: number) {
    return playthroughs.filter((p) => {
      const startYear = p.started_at.getFullYear();
      const endYear = p.ended_at?.getFullYear();

      return startYear <= year && (!endYear || endYear >= year);
    });
  }

  async getAvailableYears(): Promise<number[]> {
    const playthroughs = await this.playthroughService.getAllByUser();

    const years = new Set<number>();

    playthroughs.forEach((p) => {
      const startYear = p.started_at.getFullYear();
      const endYear = p.ended_at?.getFullYear() ?? new Date().getFullYear();

      for (let y = startYear; y <= endYear; y++) {
        years.add(y);
      }
    });

    return Array.from(years).sort((a, b) => b - a);
  }
}

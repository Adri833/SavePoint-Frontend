import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { PlaythroughService } from '../../../../services/playtrough.service';
import { Playthrough, PlaythroughStatus } from '../../../../models/playtrough.model';
import { GamesService } from '../../../../services/games.service';

@Component({
  selector: 'app-playthroughs',
  imports: [CommonModule, FormsModule],
  templateUrl: './playthroughs.html',
  styleUrl: './playthroughs.scss',
})
export class Playthroughs implements OnInit {
  playthroughs: Playthrough[] = [];
  loading = false;
  error: string | null = null;

  years: number[] = [];
  selectedYear!: number;

  constructor(
    private playthroughService: PlaythroughService,
    private gamesService: GamesService,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.loadLibrary();
  }

  async loadLibrary() {
    this.loading = true;
    this.cd.detectChanges();
    try {
      this.playthroughs = await this.playthroughService.getAllByUser();

      // Cargamos info de juegos
      await Promise.all(
        this.playthroughs.map(async (p) => {
          const game = await firstValueFrom(this.gamesService.getGameById(p.game_id));
          p.game_name = game?.name ?? 'Desconocido';
          p.game_background =
            game?.background_image ??
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJQeJyzgAzTEVqXiGe90RGBFhfp_4RcJJMQ&s';
        }),
      );

      // Extraemos los años dinámicos
      const yearSet = new Set<number>();
      this.playthroughs.forEach((p) => {
        const start = new Date(p.started_at).getFullYear();
        const end = p.ended_at ? new Date(p.ended_at).getFullYear() : new Date().getFullYear();
        for (let y = start; y <= end; y++) yearSet.add(y);
      });

      this.years = Array.from(yearSet).sort((a, b) => b - a);
      this.selectedYear = this.years[0];

    } catch (err: any) {
      this.error = err.message ?? 'Error loading playthroughs';
    } finally {
      this.loading = false;
      this.cd.detectChanges();
    }
  }

  get filteredPlaythroughs(): Playthrough[] {
    return this.playthroughs.filter((p) => {
      const start = new Date(p.started_at).getFullYear();
      const end = p.ended_at ? new Date(p.ended_at).getFullYear() : new Date().getFullYear();
      return start <= this.selectedYear && end >= this.selectedYear;
    });
  }

  getStatusClass(status: PlaythroughStatus) {
    switch (status) {
      case 'playing':
        return 'playing';
      case 'finished':
        return 'completed';
      case 'dropped':
        return 'dropped';
    }
  }
}

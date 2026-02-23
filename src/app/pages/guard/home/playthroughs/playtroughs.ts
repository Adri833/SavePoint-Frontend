import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, firstValueFrom } from 'rxjs';
import { PlaythroughService } from '../../../../services/playtrough.service';
import { Playthrough } from '../../../../models/playtrough.model';
import { GamesService } from '../../../../services/games.service';
import { GameDTO } from '../../../../utils/game-mapper';
import { PlaythroughDetailModal } from '../../../../shared/components/playthrough-detail-modal/playthrough-detail-modal';
import { ConfirmModal } from '../../../../shared/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-playthroughs',
  standalone: true,
  imports: [CommonModule, FormsModule, PlaythroughDetailModal, ConfirmModal],
  templateUrl: './playthroughs.html',
  styleUrl: './playthroughs.scss',
})
export class Playthroughs implements OnInit {
  selectedStatus: 'all' | 'playing' | 'finished' | 'platinum' | 'dropped' = 'all';
  selectedPlaythrough: Playthrough | null = null;

  playthroughs: Playthrough[] = [];
  loading = false;
  error: string | null = null;
  playthroughToFinish: Playthrough | null = null;

  years: number[] = [];
  selectedYear!: number;
  showGrid = true;
  showConfirmModal = false;

  constructor(
    private playthroughService: PlaythroughService,
    private gamesService: GamesService,
    private cd: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    await this.loadLibrary();
  }

  async loadLibrary() {
    this.loading = true;
    this.cd.detectChanges();

    try {
      this.playthroughs = await this.playthroughService.getAllByUser();

      if (this.playthroughs.length) {
        const gameRequests = this.playthroughs.map((p) => this.gamesService.getGameById(p.game_id));

        const games: GameDTO[] = await firstValueFrom(forkJoin(gameRequests));

        games.forEach((game, i) => {
          const p = this.playthroughs[i];
          p.game_name = game.name;
          p.game_background = game.background_image ?? '';
        });

        this.playthroughs.sort(
          (a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime(),
        );

        this.years = this.extractYears(this.playthroughs);
        this.selectedYear = this.years[0];
      }
    } catch (err: any) {
      this.error = err.message ?? 'Error loading playthroughs';
    } finally {
      this.loading = false;
      this.cd.detectChanges();
    }
  }

  private extractYears(playthroughs: Playthrough[]): number[] {
    const yearSet = new Set<number>();
    playthroughs.forEach((p) => {
      const start = new Date(p.started_at).getFullYear();
      const end = p.ended_at ? new Date(p.ended_at).getFullYear() : new Date().getFullYear();
      for (let y = start; y <= end; y++) yearSet.add(y);
    });
    return Array.from(yearSet).sort((a, b) => b - a);
  }

  get filteredPlaythroughs(): Playthrough[] {
    return this.playthroughs.filter((p) => {
      const start = new Date(p.started_at).getFullYear();
      const end = p.ended_at ? new Date(p.ended_at).getFullYear() : new Date().getFullYear();

      // Filtrar por año
      const inYear = start <= this.selectedYear && end >= this.selectedYear;

      // Filtrar por estado
      let statusMatch = true;
      if (this.selectedStatus !== 'all') {
        if (this.selectedStatus === 'platinum') {
          statusMatch = p.status === 'finished' && p.completed && p.platinum;
        } else if (this.selectedStatus === 'finished') {
          statusMatch = p.status === 'finished' && p.completed && !p.platinum;
        } else if (this.selectedStatus === 'playing') {
          statusMatch = p.status === 'playing';
        } else if (this.selectedStatus === 'dropped') {
          statusMatch = p.status === 'finished' && !p.completed;
        }
      }

      return inYear && statusMatch;
    });
  }

  onFilterChange() {
    this.showGrid = false;
    this.cd.detectChanges();
    setTimeout(() => {
      this.showGrid = true;
      this.cd.detectChanges();
    }, 10);
  }

  getStatusClass(p: Playthrough) {
    if (p.status === 'playing') return 'playing';
    if (p.status === 'finished' && p.completed && p.platinum) return 'platinum';
    if (p.status === 'finished' && p.completed) return 'completed';
    if (p.status === 'finished' && !p.completed) return 'dropped';
    return '';
  }

  // ---------- MODAL DE DATOS DE PARTIDA ---------

  openDetailModal(p: Playthrough) {
    this.selectedPlaythrough = p;
  }

  closeDetailModal() {
    this.selectedPlaythrough = null;
  }

  handleFinish(p: Playthrough) {
    this.playthroughToFinish = p;
    this.showConfirmModal = true;
  }

  confirmFinish() {
    if (!this.playthroughToFinish) return;
    // Hay que llamar al service
    console.log('Confirmado finalizar:', this.playthroughToFinish);

    this.showConfirmModal = false;
    this.playthroughToFinish = null;
  }

  cancelFinish() {
    this.showConfirmModal = false;
    this.playthroughToFinish = null;
  }

  handleEdit(p: Playthrough) {
    //TODO: logica de editar partida
    console.log('Editar partida', p);
  }
}

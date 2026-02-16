import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Game, GamesService } from '../../../../services/games.service';
import { PlatformIcons } from '../../../../shared/components/platform-icons/platform-icons';
import { Playthrough } from '../../../../models/playtrough.model';
import { PlaythroughService } from '../../../../services/playtrough.service';
import { FormsModule } from '@angular/forms';
import { StartPlaythroughModal } from '../../../../shared/components/start-playthrough-modal/start-playthrough-modal';
import { FinishPlaythroughModal } from '../../../../shared/components/finish-playthrough-modal/finish-playthrough-modal';
import { EditPlaythroughModal } from '../../../../shared/components/edit-playthrough-modal/edit-playthrough-modal';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [
    CommonModule,
    PlatformIcons,
    FormsModule,
    StartPlaythroughModal,
    FinishPlaythroughModal,
    EditPlaythroughModal,
  ],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.scss',
})
export class GameDetail implements OnInit, AfterViewChecked {
  isLoading = true;
  game!: Game;
  screenshots: string[] = [];

  showFullAbout = false;
  showToggle = false;
  showStartModal = false;
  showFinishModal = false;
  showEditModal = false;

  activePlaythrough: Playthrough | null = null;
  pastPlaythroughs: Playthrough[] = [];

  private needsHeightCheck = false;

  @ViewChild('aboutText') aboutText!: ElementRef<HTMLParagraphElement>;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private cd: ChangeDetectorRef,
    private playthroughService: PlaythroughService,
  ) {}

  /* ================= GETTERS ================= */

  get hasActivePlaythrough(): boolean {
    return !!this.activePlaythrough;
  }

  get currentPlaythrough(): Playthrough {
    return this.activePlaythrough!;
  }

  /* ================= LIFECYCLE ================= */

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const gameId = Number(params.get('id'));
      if (!gameId) return;

      this.isLoading = true;
      this.showFullAbout = false;
      this.showToggle = false;
      this.screenshots = [];

      try {
        // Esperamos a que juego y playthroughs se carguen juntos
        const [game, playthroughs, screenshots] = await Promise.all([
          this.gamesService.getGameById(gameId).toPromise(),
          this.playthroughService.getByGame(gameId),
          this.gamesService.getGameScreenshots(gameId).toPromise(),
        ]);

        // Juego
        if (!game) return;
        this.game = game;

        // Playthroughs
        this.activePlaythrough = playthroughs.find((p) => p.status === 'playing') ?? null;
        this.pastPlaythroughs = playthroughs.filter((p) => p.status !== 'playing');

        // Screenshots
        this.screenshots = screenshots ? screenshots.map((s) => s.image) : [];

        // UI
        setTimeout(() => this.checkAboutHeight());
      } catch (err) {
        console.error('Error cargando datos del juego:', err);
      } finally {
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.needsHeightCheck && this.aboutText) {
      this.checkAboutHeight();
    }
  }

  /* ================= DATA ================= */

  async loadPlaythroughs(gameId: number) {
    const all = await this.playthroughService.getByGame(gameId);

    this.activePlaythrough = all.find((p) => p.status === 'playing') ?? null;
    this.pastPlaythroughs = all.filter((p) => p.status !== 'playing');

    this.cd.detectChanges();
  }

  loadGame(gameId: number) {
    this.isLoading = true;
    this.showFullAbout = false;
    this.showToggle = false;
    this.screenshots = [];

    this.gamesService.getGameById(gameId).subscribe({
      next: (game) => {
        this.game = game;

        this.gamesService.getGameScreenshots(gameId).subscribe({
          next: (imgs: any[]) => {
            this.screenshots = imgs.map((s) => s.image);
            this.isLoading = false;

            setTimeout(() => this.checkAboutHeight());
            this.cd.detectChanges();
          },
          error: () => (this.isLoading = false),
        });
      },
      error: () => (this.isLoading = false),
    });
  }

  /* ================= ACTIONS ================= */

  openStartModal() {
    this.showStartModal = true;
  }

  closeStartModal() {
    this.showStartModal = false;
  }

  openFinishModal() {
    this.showFinishModal = true;
  }

  closeFinishModal() {
    this.showFinishModal = false;
  }

  onPlaythroughFinished() {
    this.loadPlaythroughs(this.game.id);
    this.closeFinishModal();
  }

  onPlaythroughStarted() {
    this.loadPlaythroughs(this.game.id);
  }

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  onPlaythroughUpdated(updated: Playthrough) {
    this.activePlaythrough = updated;
    this.closeEditModal();
  }

  /* ================= UI ================= */

  private checkAboutHeight() {
    const el = this.aboutText.nativeElement;
    this.showToggle = el.scrollHeight > 300;
    this.needsHeightCheck = false;
    this.cd.detectChanges();
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getRatingClass(rating: number): string {
    if (rating >= 4.5) return 'rating-excellent';
    if (rating >= 3.5) return 'rating-good';
    if (rating >= 2.5) return 'rating-ok';
    return 'rating-bad';
  }
}

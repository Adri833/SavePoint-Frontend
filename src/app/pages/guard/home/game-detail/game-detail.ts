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

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, PlatformIcons, FormsModule],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.scss',
})
export class GameDetail implements OnInit, AfterViewChecked {
  isLoading = true;
  game!: Game;
  screenshots: string[] = [];

  showFullAbout = false;
  showToggle = false;

  activePlaythrough: Playthrough | null = null;
  pastPlaythroughs: Playthrough[] = [];

  showStartModal = false;
  startStep = 1;
  private _startDate: Date = new Date();
  startNotes = '';

  showFinishModal = false;
  finishHours = 0;
  finishNotes = '';

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

  get startDate(): string {
    return this._startDate.toISOString().split('T')[0];
  }
  set startDate(value: string) {
    this._startDate = new Date(value);
  }

  /* ================= LIFECYCLE ================= */

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const gameId = Number(params.get('id'));
      if (gameId) {
        this.loadGame(gameId);
        this.loadPlaythroughs(gameId);
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

  openFinishModal() {
    this.finishHours = 0;
    this.finishNotes = '';
    this.showFinishModal = true;
  }

  async confirmFinish() {
    if (!this.activePlaythrough) return;

    const finished = await this.playthroughService.finish(
      this.activePlaythrough.id,
      this.finishHours,
      this.finishNotes,
    );

    this.pastPlaythroughs.unshift(finished);
    this.activePlaythrough = null;
    this.showFinishModal = false;
  }

  async dropPlaythrough() {
    if (!this.activePlaythrough) return;

    const dropped = await this.playthroughService.drop(this.activePlaythrough.id);

    this.pastPlaythroughs.unshift(dropped);
    this.activePlaythrough = null;
  }

  openStartModal() {
    this.startStep = 1;
    this._startDate = new Date();
    this.startNotes = '';
    this.showStartModal = true;
  }

  async confirmStart() {
    if (!this.game) return;

    const created = await this.playthroughService.start(
      this.game.id,
      this._startDate,
      this.startNotes,
    );

    this.activePlaythrough = created;
    this.showStartModal = false;
  }

  nextStartStep() {
    if (this.startStep < 3) {
      this.startStep++;
    }
  }

  prevStartStep() {
    if (this.startStep > 1) {
      this.startStep--;
    }
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

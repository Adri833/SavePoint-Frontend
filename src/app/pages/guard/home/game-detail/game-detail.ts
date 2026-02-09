import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, GamesService } from '../../../../services/games.service';
import { CommonModule } from '@angular/common';
import { PlatformIcons } from '../../../../shared/components/platform-icons/platform-icons';

@Component({
  selector: 'app-game-detail',
  imports: [CommonModule, PlatformIcons],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.scss',
})
export class GameDetail implements OnInit {
  game!: Game;
  screenshots: string[] = [];
  showFullAbout = false;
  showToggle = false;

  @ViewChild('aboutText') aboutText!: ElementRef<HTMLParagraphElement>;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const gameId = Number(params.get('id'));
      this.loadGame(gameId);
    });
  }

  loadGame(gameId: number) {
    this.showFullAbout = false;
    this.showToggle = false;
    this.screenshots = [];
    this.game = undefined!;

    this.gamesService.getGameById(gameId).subscribe((game) => {
      this.game = game;

      this.cd.detectChanges();

      this.gamesService.getGameScreenshots(gameId).subscribe((imgs: any[]) => {
        this.screenshots = imgs.map((s) => s.image);

        Promise.resolve().then(() => {
          this.checkAboutHeight();
        });
      });
    });
  }

  private checkAboutHeight() {
    if (this.game && this.aboutText) {
      const el = this.aboutText.nativeElement;
      this.showToggle = el.scrollHeight > 300;
      this.cd.detectChanges();
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES');
  }

  getRatingClass(rating: number): string {
    if (rating >= 4.5) return 'rating-excellent';
    if (rating >= 3.5) return 'rating-good';
    if (rating >= 2.5) return 'rating-ok';
    return 'rating-bad';
  }
}

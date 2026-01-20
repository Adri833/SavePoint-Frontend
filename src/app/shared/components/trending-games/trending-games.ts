import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { GamesService, Game } from '../../../services/games';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending-games',
  imports: [CommonModule],
  templateUrl: './trending-games.html',
  styleUrls: ['./trending-games.scss']
})
export class TrendingGamesComponent implements OnInit {
  trendingGames: Game[] = [];

  showLeftButton = false;
  showRightButton = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  constructor(
    private gamesService: GamesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.gamesService.getTrendingGames().subscribe({
      next: (games) => {
        this.trendingGames = games;

        // Esperamos a que se renderice el DOM
        setTimeout(() => {
          this.updateScrollButtons();
          this.scrollContainer.nativeElement.addEventListener('scroll', () => this.updateScrollButtons());
        }, 0);

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando juegos en tendencia', err)
    });
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -920, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 920, behavior: 'smooth' });
  }

  private updateScrollButtons() {
    const container = this.scrollContainer.nativeElement;
    this.showLeftButton = container.scrollLeft > 0;
    this.showRightButton = container.scrollLeft < container.scrollWidth - container.clientWidth;
    this.cdr.detectChanges();
  }
}

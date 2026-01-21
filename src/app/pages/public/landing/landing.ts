import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GamesService, Game } from '../../../services/games';
import { Logo } from '../../../shared/components/logo/logo';
import { ButtonRgb } from '../../../shared/components/button-rgb/button-rgb';
import { HorizontalScrollSection } from '../../../shared/components/horizontal-scroll-section/horizontal-scroll-section';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [CommonModule, Logo, ButtonRgb, HorizontalScrollSection],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  trendingGames: Game[] = [];
  upComingGames: Game[] = [];
  constructor(
    private router: Router,
    private gamesService: GamesService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.gamesService.getTrendingGames().subscribe((games) => {
      this.trendingGames = games;
      this.cdr.detectChanges();
    });

    this.gamesService.getUpComingGames().subscribe((games) => {
      this.upComingGames = games;
      this.cdr.detectChanges();
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

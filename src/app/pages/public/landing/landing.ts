import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Logo } from '../../../shared/components/logo/logo';
import { ButtonRgb } from '../../../shared/components/button-rgb/button-rgb';
import { TrendingGamesComponent } from "../../../shared/components/trending-games/trending-games";

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [CommonModule, Logo, ButtonRgb, TrendingGamesComponent],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

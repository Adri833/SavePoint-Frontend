import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Logo } from '../../../shared/logo/logo';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [CommonModule, Logo],
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

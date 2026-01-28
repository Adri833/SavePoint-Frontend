import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Logo } from '../logo/logo';
import { Button } from '../button/button';

@Component({
  selector: 'app-navbar',
  imports: [Logo, Button],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isScrolled = false;
  constructor(private router: Router) {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 40;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

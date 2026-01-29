import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarItemComponent } from "../sidebar-item/sidebar-item";

@Component({
  selector: 'app-sidebar',
  imports: [SidebarItemComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
  }

  constructor(
    private router: Router
  ) {}

  goToBiblioteca() {
    this.router.navigate(['/home/biblioteca']);
  }

  goToDashboard() {
    this.router.navigate(['/home/dashboard']);
  }
}

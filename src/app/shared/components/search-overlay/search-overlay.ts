import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../services/search.service';
import { Router } from '@angular/router';
import { PlatformIcons } from '../platform-icons/platform-icons';

@Component({
  selector: 'app-search-overlay',
  imports: [CommonModule, PlatformIcons],
  templateUrl: './search-overlay.html',
  styleUrl: './search-overlay.scss',
})
export class SearchOverlay {
  constructor(
    private searchService: SearchService,
    private router: Router,
  ) {}

  get query$() {
    return this.searchService.query$;
  }

  get results$() {
    return this.searchService.results$;
  }

  get loading$() {
    return this.searchService.loading$;
  }

  goToGame(gameId: number) {
    this.searchService.clear();
    document.body.style.overflow = '';

    this.router.navigate(['/home/game', gameId]);
  }

  @HostListener('document:keydown', ['$event'])
  onEsc(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeOverlay();
    }
  }

  closeOverlay() {
    this.searchService.clear();
    document.body.style.overflow = '';
  }
}

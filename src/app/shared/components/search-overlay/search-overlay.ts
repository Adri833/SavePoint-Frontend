import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-overlay',
  imports: [CommonModule],
  templateUrl: './search-overlay.html',
  styleUrl: './search-overlay.scss',
})
export class SearchOverlay {
  constructor(private searchService: SearchService) {}

  get query$() {
    return this.searchService.query$;
  }

  get results$() {
    return this.searchService.results$;
  }

  get loading$() {
    return this.searchService.loading$;
  }

  getPlatformIcon(name: string): string {
    switch (name.toLowerCase()) {
      case 'pc':
        return 'icon-pc';
      case 'playstation':
        return 'icon-playstation';
      case 'xbox':
        return 'icon-xbox';
      case 'nintendo':
        return 'icon-nintendo';
      default:
        return '';
    }
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

import { Component } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-overlay',
  imports: [CommonModule],
  templateUrl: './search-overlay.html',
  styleUrl: './search-overlay.scss',
})
export class SearchOverlay {
  query = '';

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.query$.subscribe((q) => {
      this.query = q;
    });
  }
}

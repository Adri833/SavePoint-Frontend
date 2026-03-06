import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  private sub = new Subscription();

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.sub.add(
      this.searchService.focus$.subscribe((shouldFocus) => {
        if (shouldFocus) {
          setTimeout(() => this.searchInput?.nativeElement?.focus(), 50);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.setQuery(value.trim());
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, switchMap, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface SearchGame {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: { name: string } }[];
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  private querySubject = new BehaviorSubject<string>('');
  query$ = this.querySubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private debouncedQuery$ = this.query$.pipe(debounceTime(300), distinctUntilChanged());

  results$ = this.debouncedQuery$.pipe(
    switchMap((query) => {
      if (!query.trim()) {
        this.loadingSubject.next(false);
        return of([]);
      }

      return this.http
        .get<{
          success: boolean;
          games: SearchGame[];
        }>('http://localhost:3000/games/search', { params: { query } })
        .pipe(
          map((res) => res.games),
          map((games) => {
            this.loadingSubject.next(false);
            return games;
          }),
        );
    }),
  );

  setQuery(query: string) {
    this.querySubject.next(query);
    this.loadingSubject.next(!!query.trim());
  }

  clear() {
    this.querySubject.next('');
    this.loadingSubject.next(false);
  }
}

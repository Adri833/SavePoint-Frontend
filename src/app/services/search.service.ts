import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, switchMap, of, map } from 'rxjs';
import { RawgService } from './rawg.service';
import { GameDTO } from '../utils/game-mapper';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private rawg: RawgService) {}

  private querySubject = new BehaviorSubject<string>('');
  query$ = this.querySubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private debouncedQuery$ = this.query$.pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  /** Resultados filtrados de RAWG */
  results$ = this.debouncedQuery$.pipe(
    switchMap((query) => {
      const trimmed = query.trim();
      if (!trimmed) {
        this.loadingSubject.next(false);
        return of<GameDTO[]>([]);
      }

      this.loadingSubject.next(true);

      return this.rawg.searchGames(trimmed).pipe(
        map((games) => games || []),
        map((games) => {
          this.loadingSubject.next(false);
          return games;
        })
      );
    })
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

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { RawgService } from './rawg.service';
import { GameDTO } from '../utils/game-mapper';

@Injectable({
  providedIn: 'root',
})
export class GamesService {

  private gameCache = new Map<number, Observable<GameDTO>>();

  constructor(private rawgService: RawgService) {}

  getTrendingGames(): Observable<GameDTO[]> {
    return this.rawgService.getTrendingGames();
  }

  getUpComingGames(): Observable<GameDTO[]> {
    return this.rawgService.getUpcomingGames();
  }

  getThisWeekGames(): Observable<GameDTO[]> {
    return this.rawgService.getGamesThisWeek();
  }

  getGameById(id: number): Observable<GameDTO> {

    if (this.gameCache.has(id)) {
      return this.gameCache.get(id)!;
    }

    const request$ = this.rawgService.getGameById(String(id)).pipe(
      shareReplay(1) // evita múltiples llamadas simultáneas
    );

    this.gameCache.set(id, request$);

    return request$;
  }

  getGameScreenshots(id: number): Observable<any[]> {
    return this.rawgService.getGameScreenshots(String(id));
  }

  searchGames(query: string): Observable<GameDTO[]> {
    return this.rawgService.searchGames(query);
  }
}
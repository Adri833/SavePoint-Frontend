import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawgService } from './rawg.service';
import { GameDTO } from '../utils/game-mapper';

@Injectable({
  providedIn: 'root',
})
export class GamesService {

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
    return this.rawgService.getGameById(String(id));
  }

  getGameScreenshots(id: number): Observable<any[]> {
    return this.rawgService.getGameScreenshots(String(id));
  }

  searchGames(query: string): Observable<GameDTO[]> {
    return this.rawgService.searchGames(query);
  }
}

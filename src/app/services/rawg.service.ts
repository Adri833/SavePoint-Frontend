import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { map, Observable, shareReplay } from 'rxjs';
import { getLastYearRange, getCurrentWeekRange, getFromTodayToNextYear } from '../utils/date.utils';
import { scoreGame } from '../utils/game-score';
import { GameDetailDTO, mapRawgGame, mapRawgGameDetail, mapRawgGames } from '../utils/game-mapper';
import { GameDTO } from '../utils/game-mapper';

@Injectable({
  providedIn: 'root',
})
export class RawgService {
  private baseUrl = environment.rawgApiUrl;
  private apiKey = environment.rawgApiKey;

  // ===== Cache stores =====
  private trendingCache$?: Observable<GameDTO[]>;
  private upcomingCache$?: Observable<GameDTO[]>;
  private thisWeekCache$?: Observable<GameDTO[]>;
  private gameCache = new Map<string, Observable<GameDTO>>();
  private searchCache = new Map<string, Observable<GameDTO[]>>();

  constructor(private http: HttpClient) {}

  private baseParams(): HttpParams {
    return new HttpParams().set('key', this.apiKey);
  }

  // ================= SEARCH =================

  searchGames(query: string): Observable<GameDTO[]> {
    if (this.searchCache.has(query)) {
      return this.searchCache.get(query)!;
    }

    const request$ = this.http
      .get<any>(`${this.baseUrl}/games`, {
        params: this.baseParams().set('search', query).set('page_size', '21'),
      })
      .pipe(
        map((res) =>
          res.results.sort((a: any, b: any) => scoreGame(b, query) - scoreGame(a, query)),
        ),
        map((games) => mapRawgGames(games)),
        shareReplay(1),
      );

    this.searchCache.set(query, request$);
    return request$;
  }

  // ================= GAME BY ID =================

  getGameById(id: string): Observable<GameDetailDTO> {
    if (this.gameCache.has(id)) {
      return this.gameCache.get(id)!;
    }

    const request$ = this.http
      .get<any>(`${this.baseUrl}/games/${id}`, {
        params: this.baseParams(),
      })
      .pipe(
        map((game) => mapRawgGameDetail(game)),
        shareReplay(1),
      );

    this.gameCache.set(id, request$);
    return request$;
  }

  // ================= SCREENSHOTS =================

  getGameScreenshots(id: string): Observable<any[]> {
    return this.http
      .get<any>(`${this.baseUrl}/games/${id}/screenshots`, {
        params: this.baseParams(),
      })
      .pipe(
        map((res) => {
          let screenshots = res.results;
          if (screenshots.length % 2 === 0) {
            screenshots = screenshots.slice(0, screenshots.length - 1);
          }
          return screenshots;
        }),
      );
  }

  // ================= TRENDING =================

  getTrendingGames(): Observable<GameDTO[]> {
    if (!this.trendingCache$) {
      this.trendingCache$ = this.http
        .get<any>(`${this.baseUrl}/games`, {
          params: this.baseParams()
            .set('ordering', '-added')
            .set('page_size', '15')
            .set('dates', getLastYearRange()),
        })
        .pipe(
          map((res) => mapRawgGames(res.results)),
          shareReplay(1),
        );
    }

    return this.trendingCache$;
  }

  // ================= UPCOMING =================

  getUpcomingGames(): Observable<GameDTO[]> {
    if (!this.upcomingCache$) {
      this.upcomingCache$ = this.http
        .get<any>(`${this.baseUrl}/games`, {
          params: this.baseParams()
            .set('ordering', '-added')
            .set('page_size', '15')
            .set('dates', getFromTodayToNextYear()),
        })
        .pipe(
          map((res) => mapRawgGames(res.results)),
          shareReplay(1),
        );
    }

    return this.upcomingCache$;
  }

  // ================= THIS WEEK =================

  getGamesThisWeek(): Observable<GameDTO[]> {
    if (!this.thisWeekCache$) {
      this.thisWeekCache$ = this.http
        .get<any>(`${this.baseUrl}/games`, {
          params: this.baseParams()
            .set('ordering', '-added')
            .set('page_size', '15')
            .set('dates', getCurrentWeekRange()),
        })
        .pipe(
          map((res) => mapRawgGames(res.results)),
          shareReplay(1),
        );
    }

    return this.thisWeekCache$;
  }

  // ================= CLEAR CACHE (opcional) =================

  clearCache(): void {
    this.trendingCache$ = undefined;
    this.upcomingCache$ = undefined;
    this.thisWeekCache$ = undefined;
    this.gameCache.clear();
    this.searchCache.clear();
  }
}

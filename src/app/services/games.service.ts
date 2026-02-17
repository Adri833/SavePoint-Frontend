import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  parent_platforms: { platform: { name: string } }[];
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private apiUrl = 'http://localhost:3000/games';
  private gameCache = new Map<number, Game>();

  constructor(private http: HttpClient) {}

  getTrendingGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/trending`);
  }

  getUpComingGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/upcoming-next-year`);
  }

  getThisWeekGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/this-week`);
  }

  getGameById(id: number): Observable<Game> {
    if (this.gameCache.has(id)) {
      return of(this.gameCache.get(id)!);
    }

    return this.http.get<Game>(`${this.apiUrl}/${id}`).pipe(
      map((game) => {
        this.gameCache.set(id, game);
        return game;
      }),
    );
  }

  getGameScreenshots(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/screenshots`);
  }
}

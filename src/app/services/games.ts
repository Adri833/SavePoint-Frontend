import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  id: number;
  name: string;
  image: string;
  rating: number;
  released: string;
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private apiUrl = 'http://localhost:3000/games';

  constructor(private http: HttpClient) {}

  getTrendingGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/trending`);
  }
}
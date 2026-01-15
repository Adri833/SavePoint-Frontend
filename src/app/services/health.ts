import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  
  private readonly API_URL = 'http://localhost:3000/health';

  constructor(private http: HttpClient) {}

  checkHealth(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}

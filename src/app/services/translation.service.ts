import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private cache = new Map<string, string>();

  constructor(private http: HttpClient) {}

  async translate(text: string, target = 'es'): Promise<string> {
    if (!text) return text;
    if (this.cache.has(text)) return this.cache.get(text)!;

    const url =
      `https://translate.googleapis.com/translate_a/single` +
      `?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;

    const res = await firstValueFrom(this.http.get<any>(url));

    const translated = res[0].map((chunk: any) => chunk[0]).join('');
    this.cache.set(text, translated);
    return translated;
  }
}

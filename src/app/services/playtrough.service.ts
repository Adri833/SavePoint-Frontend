import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { Playthrough } from '../models/playtrough.model';

@Injectable({
  providedIn: 'root',
})
export class PlaythroughService {
  /* ========== GET ========== */

  async getByGame(gameId: number): Promise<Playthrough[]> {
    const { data, error } = await supabase
      .from('playthroughs')
      .select('*')
      .eq('game_id', gameId)
      .order('started_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  async getActiveByGame(gameId: number): Promise<Playthrough | null> {
    const { data, error } = await supabase
      .from('playthroughs')
      .select('*')
      .eq('game_id', gameId)
      .eq('status', 'playing')
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /* ========== CREATE ========== */


  async start(gameId: number, notes?: string) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('playthroughs')
      .insert({
        user_id: user.id,
        game_id: gameId,
        status: 'playing',
        started_at: new Date().toISOString(),
        notes: notes ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Playthrough;
  }

  /* ========== UPDATE ========== */


  async finish(id: string, hours: number, notes?: string) {
    const { data, error } = await supabase
      .from('playthroughs')
      .update({
        status: 'finished',
        finished_at: new Date().toISOString(),
        hours,
        notes: notes ?? null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Playthrough;
  }

  async drop(id: string, notes?: string) {
    const { data, error } = await supabase
      .from('playthroughs')
      .update({
        status: 'dropped',
        notes: notes ?? null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Playthrough;
  }
}

import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { Playthrough } from '../models/playtrough.model';

@Injectable({
  providedIn: 'root',
})
export class PlaythroughService {
  private async getUserId(): Promise<string> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');
    return user.id;
  }

  /* ========== GET ========== */

  async getAllByUser(): Promise<Playthrough[]> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('playthroughs')
      .select('*')
      .eq('user_id', user.id)
      .order('started_at', { ascending: false });

    if (error) throw error;

    return (data ?? []).map((p) => ({
      ...p,
      started_at: new Date(p.started_at),
      ended_at: p.ended_at ? new Date(p.ended_at) : null,
      created_at: new Date(p.created_at),
      updated_at: new Date(p.updated_at),
    }));
  }

  async getByGame(gameId: number): Promise<Playthrough[]> {
    const userId = await this.getUserId();

    const { data, error } = await supabase
      .from('playthroughs')
      .select('*')
      .eq('game_id', gameId)
      .eq('user_id', userId)
      .order('started_at', { ascending: false });

    if (error) throw error;

    return (data ?? []).map((p) => ({
      ...p,
      started_at: new Date(p.started_at),
      ended_at: p.ended_at ? new Date(p.ended_at) : null,
      created_at: new Date(p.created_at),
      updated_at: new Date(p.updated_at),
    }));
  }

  async getActiveByGame(gameId: number): Promise<Playthrough | null> {
    const userId = await this.getUserId();

    const { data, error } = await supabase
      .from('playthroughs')
      .select('*')
      .eq('game_id', gameId)
      .eq('user_id', userId)
      .eq('status', 'playing')
      .maybeSingle();

    if (error) throw error;

    if (!data) return null;

    return {
      ...data,
      started_at: new Date(data.started_at),
      ended_at: data.ended_at ? new Date(data.ended_at) : null,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
    };
  }

  /* ========== CREATE ========== */

  async start(gameId: number, startedAt: Date, notes?: string) {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('Not authenticated');

    if (startedAt > new Date()) {
      throw new Error('La fecha de inicio no puede ser futura');
    }

    const { data, error } = await supabase
      .from('playthroughs')
      .insert({
        user_id: user.id,
        game_id: gameId,
        status: 'playing',
        started_at: startedAt.toISOString(),
        notes: notes ?? null,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      started_at: new Date(data.started_at),
      ended_at: data.ended_at ? new Date(data.ended_at) : null,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
    } as Playthrough;
  }

  /* ========== UPDATE ========== */

  async update(
    id: string,
    started_at: Date,
    hours: number,
    completed: boolean,
    platinum: boolean,
    notes?: string,
  ) {
    if (platinum && !completed) {
      throw new Error('No se puede tener platino sin completar el juego');
    }

    if (started_at > new Date()) {
      throw new Error('La fecha de inicio no puede ser futura');
    }

    if (hours < 0) {
      throw new Error('Las horas no pueden ser negativas');
    }

    const { data, error } = await supabase
      .from('playthroughs')
      .update({
        started_at: started_at.toISOString(),
        hours,
        completed,
        platinum,
        notes: notes ?? null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      started_at: new Date(data.started_at),
      ended_at: data.ended_at ? new Date(data.ended_at) : null,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
    } as Playthrough;
  }

  async finish(
    id: string,
    ended_at: Date,
    hours: number,
    completed: boolean,
    platinum: boolean,
    notes?: string,
  ) {
    if (platinum && !completed) {
      throw new Error('No se puede tener platino sin completar el juego');
    }

    if (ended_at > new Date()) {
      throw new Error('La fecha de finalización no puede ser futura');
    }

    const { data, error } = await supabase
      .from('playthroughs')
      .update({
        status: 'finished',
        ended_at: ended_at.toISOString(),
        hours,
        completed,
        platinum,
        notes: notes ?? null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      started_at: new Date(data.started_at),
      ended_at: data.ended_at ? new Date(data.ended_at) : null,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
    } as Playthrough;
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

    return {
      ...data,
      started_at: new Date(data.started_at),
      ended_at: data.ended_at ? new Date(data.ended_at) : null,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
    } as Playthrough;
  }
}

export interface Playthrough {
  id: string;
  user_id: string;
  game_id: number;

  status: 'playing' | 'finished' | 'dropped';

  started_at: string;
  finished_at: string | null;
  hours: number | null;

  notes: string | null;
}

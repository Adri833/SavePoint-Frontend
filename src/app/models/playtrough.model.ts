export type PlaythroughStatus = 'playing' | 'finished' | 'dropped';

export interface Playthrough {
  id: string;
  user_id: string;
  game_id: number;
  started_at: Date;
  ended_at: Date | null;
  hours: number;
  completed: boolean;
  platinum: boolean;
  status: PlaythroughStatus;
  created_at: Date;
  updated_at: Date;
  notes: string | null;
}

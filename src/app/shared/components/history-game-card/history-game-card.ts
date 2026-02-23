// src/app/shared/components/history-game-card/history-game-card.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Playthrough } from '../../../models/playtrough.model';

@Component({
  selector: 'app-history-game-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-game-card.html',
  styleUrls: ['./history-game-card.scss'],
})
export class HistoryGameCard{
  private _playthroughs: Playthrough[] = [];

  @Input() 
  set pastPlaythroughs(value: Playthrough[] | Playthrough) {
    this._playthroughs = Array.isArray(value) ? value : [value];
  }
  get pastPlaythroughs(): Playthrough[] {
    return this._playthroughs;
  }

  @Output() editPlaythrough = new EventEmitter<Playthrough>();

  onEdit(pt: Playthrough) {
    this.editPlaythrough.emit(pt);
  }
}

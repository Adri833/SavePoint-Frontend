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
  @Input() pastPlaythroughs: Playthrough[] = [];
  @Output() editPlaythrough = new EventEmitter<Playthrough>();

  onEdit(pt: Playthrough) {
    this.editPlaythrough.emit(pt);
  }
}

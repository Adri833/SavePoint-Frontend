import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Playthrough } from '../../../models/playtrough.model';
import { CloseButton } from '../close-button/close-button';
import { HistoryGameCard } from '../history-game-card/history-game-card';

@Component({
  selector: 'app-playthrough-detail-modal',
  imports: [CommonModule, CloseButton, HistoryGameCard],
  templateUrl: './playthrough-detail-modal.html',
  styleUrl: './playthrough-detail-modal.scss',
})
export class PlaythroughDetailModal {
  @Input() playthrough!: Playthrough;
  @Output() close = new EventEmitter<void>();
  @Output() finish = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: Event) {
    event.preventDefault();
    this.onClose();
  }

  onClose() {
    this.close.emit();
  }

  onFinish() {
    this.finish.emit();
  }

  onEdit() {
    this.edit.emit();
  }
}

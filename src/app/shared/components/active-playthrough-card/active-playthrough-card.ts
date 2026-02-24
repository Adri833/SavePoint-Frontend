import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Playthrough } from '../../../models/playtrough.model';

@Component({
  selector: 'app-active-playthrough-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-playthrough-card.html',
  styleUrl: './active-playthrough-card.scss',
})
export class ActivePlaythroughCard {
  @Input() playthrough!: Playthrough;

  @Output() finish = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Playthrough>();

  onFinish() {
    this.finish.emit();
  }

  onEdit() {
    this.edit.emit(this.playthrough);
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
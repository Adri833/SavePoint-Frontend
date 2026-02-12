import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Playthrough } from '../../../models/playtrough.model';
import { PlaythroughService } from '../../../services/playtrough.service';

@Component({
  selector: 'app-finish-playthrough-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './finish-playthrough-modal.html',
  styleUrl: './finish-playthrough-modal.scss',
})
export class FinishPlaythroughModal implements OnInit {
  @Input() playthrough!: Playthrough;

  @Output() closed = new EventEmitter<void>();
  @Output() finished = new EventEmitter<void>();

  endDate!: string;
  hours!: number;
  completed = false;
  platinum = false;
  notes: string | null = null;

  constructor(private playthroughService: PlaythroughService) {}

  ngOnInit(): void {
    // Precarga de datos
    this.endDate = new Date().toISOString().split('T')[0];
    this.hours = this.playthrough.hours ?? 0;
    this.completed = this.playthrough.completed;
    this.platinum = this.playthrough.platinum;
    this.notes = this.playthrough.notes;
  }

  async finishPlaythrough() {
    if (!this.endDate) return;

    const endedAt = new Date(this.endDate);

    if (endedAt < this.playthrough.started_at) {
      alert('La fecha de finalización no puede ser anterior al inicio');
      return;
    }

    try {
      await this.playthroughService.finish(
        this.playthrough.id,
        endedAt,
        this.hours,
        this.completed,
        this.platinum,
        this.notes ?? undefined,
      );

      this.finished.emit();
      this.close();
    } catch (err: any) {
      alert(err.message);
    }
  }

  onCompletedChange() {
    if (!this.completed) {
      this.platinum = false;
    }
  }

  onPlatinumChange() {
    if (this.platinum) {
      this.completed = true;
    }
  }

  close() {
    this.closed.emit();
  }
}

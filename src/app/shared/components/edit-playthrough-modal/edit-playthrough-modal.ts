import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Litepicker from 'litepicker';
import { Playthrough } from '../../../models/playtrough.model';
import { PlaythroughService } from '../../../services/playtrough.service';

@Component({
  selector: 'app-edit-playthrough-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-playthrough-modal.html',
  styleUrl: './edit-playthrough-modal.scss',
})
export class EditPlaythroughModal implements OnInit, AfterViewInit, OnDestroy {
  @Input() playthrough!: Playthrough;
  @Output() closed = new EventEmitter<void>();
  @Output() updated = new EventEmitter<Playthrough>();

  @ViewChild('dateInput') dateInput!: ElementRef;

  startedAtISO!: string;
  hours!: number;
  completed = false;
  platinum = false;
  notes: string | null = null;

  isLoading = false;
  errorMessage: string | null = null;

  private picker!: Litepicker;
  private removeKeyListener!: () => void;

  constructor(
    private playthroughService: PlaythroughService,
    private renderer: Renderer2,
  ) {}

  get isPlaying(): boolean {
    return this.playthrough.status === 'playing';
  }

  ngOnInit(): void {
    this.startedAtISO = this.playthrough.started_at.toISOString().split('T')[0];
    this.hours = this.playthrough.hours ?? 0;
    this.completed = this.playthrough.completed;
    this.platinum = this.playthrough.platinum;
    this.notes = this.playthrough.notes;

    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    this.removeKeyListener = this.renderer.listen('window', 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') this.close();
    });
  }

  ngAfterViewInit(): void {
    const startDate = new Date(this.startedAtISO);

    this.picker = new Litepicker({
      element: this.dateInput.nativeElement,
      singleMode: true,
      format: 'DD MMM. YYYY',
      mobileFriendly: true,
      lang: 'es-ES',
      startDate: startDate,
    });

    this.dateInput.nativeElement.value = this.picker.getStartDate()?.format('DD MMM. YYYY');

    this.picker.on('selected', (date) => {
      this.startedAtISO = date.format('YYYY-MM-DD');
      this.dateInput.nativeElement.value = date.format('DD MMM. YYYY');
    });
  }

  async updatePlaythrough() {
    this.errorMessage = null;

    if (!this.startedAtISO) {
      this.errorMessage = 'Debes seleccionar una fecha válida';
      return;
    }

    if (this.hours < 0) {
      this.errorMessage = 'Las horas no pueden ser negativas';
      return;
    }

    this.isLoading = true;

    try {
      const updatedPlaythrough = await this.playthroughService.update(
        this.playthrough.id,
        new Date(this.startedAtISO),
        this.isPlaying ? 0 : this.hours,
        this.isPlaying ? false : this.completed,
        this.isPlaying ? false : this.platinum,
        this.notes ?? undefined,
      );

      this.updated.emit(updatedPlaythrough);

      this.close();
    } catch (err: any) {
      this.errorMessage = err.message ?? 'Error inesperado';
    } finally {
      this.isLoading = false;
    }
  }

  onCompletedChange() {
    if (!this.completed) this.platinum = false;
  }

  onPlatinumChange() {
    if (this.platinum) this.completed = true;
  }

  increment(input: HTMLInputElement) {
    let value = parseInt(input.value) || 0;
    value++;
    input.value = value.toString();
    this.hours = value;
  }

  decrement(input: HTMLInputElement) {
    let value = parseInt(input.value) || 0;
    value = Math.max(0, value - 1);
    input.value = value.toString();
    this.hours = value;
  }

  close() {
    this.closed.emit();
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'overflow');
    if (this.removeKeyListener) this.removeKeyListener();
    if (this.picker) this.picker.destroy();
  }
}

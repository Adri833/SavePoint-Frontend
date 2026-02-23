import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-close-button',
  imports: [],
  templateUrl: './close-button.html',
  styleUrl: './close-button.scss',
})
export class CloseButton {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}

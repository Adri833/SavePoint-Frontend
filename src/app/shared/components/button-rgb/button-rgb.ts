import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-rgb',
  imports: [],
  templateUrl: './button-rgb.html',
  styleUrl: './button-rgb.scss',
})
export class ButtonRgb {
  @Output() onClick = new EventEmitter<void>();
}

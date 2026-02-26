import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-year-selector',
  imports: [],
  templateUrl: './year-selector.html',
  styleUrl: './year-selector.scss',
})
export class YearSelector {
  @Input() years: number[] = [];
  @Input() selectedYear = new Date().getFullYear();
  @Input() disabled = false;

  @Output() yearChange = new EventEmitter<number>();

  onSelect(year: number) {
    if (year !== this.selectedYear) {
      this.yearChange.emit(year);
    }
  }
}

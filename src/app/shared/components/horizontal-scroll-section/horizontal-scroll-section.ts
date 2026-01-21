import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface scrollItem {
  name: string;
  image: string;
}

@Component({
  selector: 'app-horizontal-scroll-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-scroll-section.html',
  styleUrl: './horizontal-scroll-section.scss',
})
export class HorizontalScrollSection implements AfterViewInit, OnChanges {
  @Input() title: string = '';
  @Input() items: scrollItem[] = [];

  @Output() itemClick = new EventEmitter<scrollItem>();

  showLeftButton = false;
  showRightButton = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.attachScrollListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.scrollContainer) {
      setTimeout(() => this.updateScrollButtons());
    }
  }

  private attachScrollListener() {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => this.updateScrollButtons());

    setTimeout(() => this.updateScrollButtons());
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -920,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 920,
      behavior: 'smooth',
    });
  }

  private updateScrollButtons() {
    const container = this.scrollContainer.nativeElement;

    this.showLeftButton = container.scrollLeft > 0;
    this.showRightButton =
      container.scrollWidth > container.clientWidth &&
      container.scrollLeft < container.scrollWidth - container.clientWidth;

    this.cdr.detectChanges();
  }
}

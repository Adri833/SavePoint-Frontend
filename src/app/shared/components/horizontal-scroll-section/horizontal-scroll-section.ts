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

export interface ScrollItem {
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
  @Input() items: ScrollItem[] = [];

  @Output() itemClick = new EventEmitter<ScrollItem>();

  showLeftButton = false;
  showRightButton = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('section') section!: ElementRef<HTMLElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.attachScrollListener();
    this.observeSection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.scrollContainer) {
      setTimeout(() => this.updateScrollButtons());
    }
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

  private attachScrollListener() {
    const container = this.scrollContainer.nativeElement;

    container.addEventListener('scroll', () => this.updateScrollButtons());

    setTimeout(() => this.updateScrollButtons());
  }

  private updateScrollButtons() {
    const container = this.scrollContainer.nativeElement;

    this.showLeftButton = container.scrollLeft > 0;
    this.showRightButton =
      container.scrollWidth > container.clientWidth &&
      container.scrollLeft < container.scrollWidth - container.clientWidth;

    this.cdr.detectChanges();
  }

  private observeSection() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.section.nativeElement.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(this.section.nativeElement);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollSection } from './horizontal-scroll-section';

describe('HorizontalScrollSection', () => {
  let component: HorizontalScrollSection;
  let fixture: ComponentFixture<HorizontalScrollSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalScrollSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalScrollSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

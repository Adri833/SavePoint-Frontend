import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSelector } from './year-selector';

describe('YearSelector', () => {
  let component: YearSelector;
  let fixture: ComponentFixture<YearSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

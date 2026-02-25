import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedStats } from './completed-stats';

describe('CompletedStats', () => {
  let component: CompletedStats;
  let fixture: ComponentFixture<CompletedStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryGameCard } from './history-game-card';

describe('HistoryGameCard', () => {
  let component: HistoryGameCard;
  let fixture: ComponentFixture<HistoryGameCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryGameCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryGameCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingGames } from './trending-games';

describe('TrendingGames', () => {
  let component: TrendingGames;
  let fixture: ComponentFixture<TrendingGames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendingGames]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingGames);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

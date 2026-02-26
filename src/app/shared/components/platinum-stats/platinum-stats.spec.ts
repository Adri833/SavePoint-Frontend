import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatinumStats } from './platinum-stats';

describe('PlatinumStats', () => {
  let component: PlatinumStats;
  let fixture: ComponentFixture<PlatinumStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatinumStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatinumStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

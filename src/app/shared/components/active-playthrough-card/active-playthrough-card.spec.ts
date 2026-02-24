import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePlaythroughCard } from './active-playthrough-card';

describe('ActivePlaythroughCard', () => {
  let component: ActivePlaythroughCard;
  let fixture: ComponentFixture<ActivePlaythroughCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivePlaythroughCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePlaythroughCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

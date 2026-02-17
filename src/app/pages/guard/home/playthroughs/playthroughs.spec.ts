import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Playthroughs } from './playtroughs';

describe('Biblioteca', () => {
  let component: Playthroughs;
  let fixture: ComponentFixture<Playthroughs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Playthroughs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Playthroughs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

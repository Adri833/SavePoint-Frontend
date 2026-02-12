import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishPlaythroughModal } from './finish-playthrough-modal';

describe('FinishPlaythroughModal', () => {
  let component: FinishPlaythroughModal;
  let fixture: ComponentFixture<FinishPlaythroughModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishPlaythroughModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishPlaythroughModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

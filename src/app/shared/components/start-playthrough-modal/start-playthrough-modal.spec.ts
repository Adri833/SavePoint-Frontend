import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPlaythroughModal } from './start-playthrough-modal';

describe('StartPlaytroughModal', () => {
  let component: StartPlaythroughModal;
  let fixture: ComponentFixture<StartPlaythroughModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartPlaythroughModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPlaythroughModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

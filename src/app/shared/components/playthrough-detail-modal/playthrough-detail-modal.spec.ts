import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaythroughDetailModal } from './playthrough-detail-modal';

describe('PlaythroughDetailModal', () => {
  let component: PlaythroughDetailModal;
  let fixture: ComponentFixture<PlaythroughDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaythroughDetailModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaythroughDetailModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

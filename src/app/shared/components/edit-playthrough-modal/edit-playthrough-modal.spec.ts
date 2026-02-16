import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlaythroughModal } from './edit-playthrough-modal';

describe('EditPlaythroughModal', () => {
  let component: EditPlaythroughModal;
  let fixture: ComponentFixture<EditPlaythroughModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlaythroughModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlaythroughModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

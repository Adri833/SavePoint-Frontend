import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRgb } from './button-rgb';

describe('ButtonRgb', () => {
  let component: ButtonRgb;
  let fixture: ComponentFixture<ButtonRgb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonRgb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonRgb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

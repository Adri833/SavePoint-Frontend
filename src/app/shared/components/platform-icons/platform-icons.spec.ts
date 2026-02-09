import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformIcons } from './platform-icons';

describe('PlatformIcons', () => {
  let component: PlatformIcons;
  let fixture: ComponentFixture<PlatformIcons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformIcons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformIcons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

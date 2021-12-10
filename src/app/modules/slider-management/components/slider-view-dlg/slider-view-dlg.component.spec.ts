import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderViewDlgComponent } from './slider-view-dlg.component';

describe('SliderViewDlgComponent', () => {
  let component: SliderViewDlgComponent;
  let fixture: ComponentFixture<SliderViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

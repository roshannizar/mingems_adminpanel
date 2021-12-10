import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCreateComponent } from './slider-create.component';

describe('SliderCreateComponent', () => {
  let component: SliderCreateComponent;
  let fixture: ComponentFixture<SliderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

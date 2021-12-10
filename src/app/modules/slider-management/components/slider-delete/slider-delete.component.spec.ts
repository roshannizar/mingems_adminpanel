import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDeleteComponent } from './slider-delete.component';

describe('SliderDeleteComponent', () => {
  let component: SliderDeleteComponent;
  let fixture: ComponentFixture<SliderDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

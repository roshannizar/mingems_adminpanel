import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationUpdateComponent } from './delivery-location-update.component';

describe('DeliveryLocationUpdateComponent', () => {
  let component: DeliveryLocationUpdateComponent;
  let fixture: ComponentFixture<DeliveryLocationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryLocationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

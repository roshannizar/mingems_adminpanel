import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationDeleteComponent } from './delivery-location-delete.component';

describe('DeliveryLocationDeleteComponent', () => {
  let component: DeliveryLocationDeleteComponent;
  let fixture: ComponentFixture<DeliveryLocationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryLocationDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

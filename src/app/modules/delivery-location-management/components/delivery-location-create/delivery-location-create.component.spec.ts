import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationCreateComponent } from './delivery-location-create.component';

describe('DeliveryLocationCreateComponent', () => {
  let component: DeliveryLocationCreateComponent;
  let fixture: ComponentFixture<DeliveryLocationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryLocationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

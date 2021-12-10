import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationViewComponent } from './delivery-location-view.component';

describe('DeliveryLocationViewComponent', () => {
  let component: DeliveryLocationViewComponent;
  let fixture: ComponentFixture<DeliveryLocationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryLocationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationViewDlgComponent } from './delivery-location-view-dlg.component';

describe('DeliveryLocationViewDlgComponent', () => {
  let component: DeliveryLocationViewDlgComponent;
  let fixture: ComponentFixture<DeliveryLocationViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryLocationViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

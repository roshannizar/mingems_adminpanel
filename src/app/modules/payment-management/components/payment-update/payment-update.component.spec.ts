import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentUpdateComponent } from './payment-update.component';

describe('PaymentUpdateComponent', () => {
  let component: PaymentUpdateComponent;
  let fixture: ComponentFixture<PaymentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

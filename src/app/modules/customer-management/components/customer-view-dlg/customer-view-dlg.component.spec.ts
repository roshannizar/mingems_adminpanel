import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewDlgComponent } from './customer-view-dlg.component';

describe('CustomerViewDlgComponent', () => {
  let component: CustomerViewDlgComponent;
  let fixture: ComponentFixture<CustomerViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

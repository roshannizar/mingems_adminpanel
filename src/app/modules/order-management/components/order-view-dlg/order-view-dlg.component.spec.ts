import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderViewDlgComponent } from './order-view-dlg.component';

describe('OrderViewDlgComponent', () => {
  let component: OrderViewDlgComponent;
  let fixture: ComponentFixture<OrderViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

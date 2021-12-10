import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTentativeDialogComponent } from './order-tentative-dialog.component';

describe('OrderTentativeDialogComponent', () => {
  let component: OrderTentativeDialogComponent;
  let fixture: ComponentFixture<OrderTentativeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTentativeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTentativeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

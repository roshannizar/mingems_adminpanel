import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDeleteComponent } from './purchase-delete.component';

describe('PurchaseDeleteComponent', () => {
  let component: PurchaseDeleteComponent;
  let fixture: ComponentFixture<PurchaseDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseViewComponent } from './purchase-view.component';

describe('PurchaseViewComponent', () => {
  let component: PurchaseViewComponent;
  let fixture: ComponentFixture<PurchaseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

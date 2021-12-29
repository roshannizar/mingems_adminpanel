import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseViewDlgComponent } from './purchase-view-dlg.component';

describe('PurchaseViewDlgComponent', () => {
  let component: PurchaseViewDlgComponent;
  let fixture: ComponentFixture<PurchaseViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

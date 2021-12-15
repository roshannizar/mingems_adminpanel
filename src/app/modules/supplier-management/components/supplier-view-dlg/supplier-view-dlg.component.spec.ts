import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierViewDlgComponent } from './supplier-view-dlg.component';

describe('SupplierViewDlgComponent', () => {
  let component: SupplierViewDlgComponent;
  let fixture: ComponentFixture<SupplierViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

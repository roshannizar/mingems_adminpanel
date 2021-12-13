import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCreateComponent } from './supplier-create.component';

describe('SupplierCreateComponent', () => {
  let component: SupplierCreateComponent;
  let fixture: ComponentFixture<SupplierCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

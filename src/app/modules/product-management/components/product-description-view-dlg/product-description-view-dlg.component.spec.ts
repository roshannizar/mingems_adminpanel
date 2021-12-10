import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDescriptionViewDlgComponent } from './product-description-view-dlg.component';

describe('ProductDescriptionViewDlgComponent', () => {
  let component: ProductDescriptionViewDlgComponent;
  let fixture: ComponentFixture<ProductDescriptionViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDescriptionViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDescriptionViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

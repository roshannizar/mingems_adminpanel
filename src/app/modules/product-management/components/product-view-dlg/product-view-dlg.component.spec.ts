import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewDlgComponent } from './product-view-dlg.component';

describe('ProductViewDlgComponent', () => {
  let component: ProductViewDlgComponent;
  let fixture: ComponentFixture<ProductViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

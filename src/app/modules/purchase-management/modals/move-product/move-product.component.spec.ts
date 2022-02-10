import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveProductComponent } from './move-product.component';

describe('MoveProductComponent', () => {
  let component: MoveProductComponent;
  let fixture: ComponentFixture<MoveProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

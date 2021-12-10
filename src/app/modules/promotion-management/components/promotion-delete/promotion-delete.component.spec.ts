import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionDeleteComponent } from './promotion-delete.component';

describe('PromotionDeleteComponent', () => {
  let component: PromotionDeleteComponent;
  let fixture: ComponentFixture<PromotionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

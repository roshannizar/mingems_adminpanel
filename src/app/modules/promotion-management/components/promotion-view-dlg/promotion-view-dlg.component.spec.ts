import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionViewDlgComponent } from './promotion-view-dlg.component';

describe('PromotionViewDlgComponent', () => {
  let component: PromotionViewDlgComponent;
  let fixture: ComponentFixture<PromotionViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentViewDlgComponent } from './investment-view-dlg.component';

describe('InvestmentViewDlgComponent', () => {
  let component: InvestmentViewDlgComponent;
  let fixture: ComponentFixture<InvestmentViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

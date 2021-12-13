import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentUpdateComponent } from './investment-update.component';

describe('InvestmentUpdateComponent', () => {
  let component: InvestmentUpdateComponent;
  let fixture: ComponentFixture<InvestmentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

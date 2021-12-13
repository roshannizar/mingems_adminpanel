import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentDeleteComponent } from './investment-delete.component';

describe('InvestmentDeleteComponent', () => {
  let component: InvestmentDeleteComponent;
  let fixture: ComponentFixture<InvestmentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

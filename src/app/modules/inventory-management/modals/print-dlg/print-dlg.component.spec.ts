import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDlgComponent } from './print-dlg.component';

describe('PrintDlgComponent', () => {
  let component: PrintDlgComponent;
  let fixture: ComponentFixture<PrintDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCodeViewDlgComponent } from './private-code-view-dlg.component';

describe('PrivateCodeViewDlgComponent', () => {
  let component: PrivateCodeViewDlgComponent;
  let fixture: ComponentFixture<PrivateCodeViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCodeViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCodeViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

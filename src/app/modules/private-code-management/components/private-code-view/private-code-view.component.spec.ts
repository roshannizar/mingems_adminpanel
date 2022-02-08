import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCodeViewComponent } from './private-code-view.component';

describe('PrivateCodeViewComponent', () => {
  let component: PrivateCodeViewComponent;
  let fixture: ComponentFixture<PrivateCodeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCodeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCodeCreateComponent } from './private-code-create.component';

describe('PrivateCodeCreateComponent', () => {
  let component: PrivateCodeCreateComponent;
  let fixture: ComponentFixture<PrivateCodeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCodeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

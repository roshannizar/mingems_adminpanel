import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCodeUpdateComponent } from './private-code-update.component';

describe('PrivateCodeUpdateComponent', () => {
  let component: PrivateCodeUpdateComponent;
  let fixture: ComponentFixture<PrivateCodeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCodeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCodeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

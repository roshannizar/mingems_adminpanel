import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCodeDeleteComponent } from './private-code-delete.component';

describe('PrivateCodeDeleteComponent', () => {
  let component: PrivateCodeDeleteComponent;
  let fixture: ComponentFixture<PrivateCodeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateCodeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCodeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

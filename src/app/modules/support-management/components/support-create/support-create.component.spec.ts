import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportCreateComponent } from './support-create.component';

describe('SupportCreateComponent', () => {
  let component: SupportCreateComponent;
  let fixture: ComponentFixture<SupportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastLoggedComponent } from './last-logged.component';

describe('LastLoggedComponent', () => {
  let component: LastLoggedComponent;
  let fixture: ComponentFixture<LastLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastLoggedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

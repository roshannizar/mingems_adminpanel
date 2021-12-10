import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingUiComponent } from './loading-ui.component';

describe('LoadingUiComponent', () => {
  let component: LoadingUiComponent;
  let fixture: ComponentFixture<LoadingUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

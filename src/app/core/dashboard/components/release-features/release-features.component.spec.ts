import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseFeaturesComponent } from './release-features.component';

describe('ReleaseFeaturesComponent', () => {
  let component: ReleaseFeaturesComponent;
  let fixture: ComponentFixture<ReleaseFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

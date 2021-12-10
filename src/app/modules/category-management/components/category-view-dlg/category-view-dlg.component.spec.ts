import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryViewDlgComponent } from './category-view-dlg.component';

describe('CategoryViewDlgComponent', () => {
  let component: CategoryViewDlgComponent;
  let fixture: ComponentFixture<CategoryViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

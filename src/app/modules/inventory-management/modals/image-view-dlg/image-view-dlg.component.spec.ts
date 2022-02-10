import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewDlgComponent } from './image-view-dlg.component';

describe('ImageViewDlgComponent', () => {
  let component: ImageViewDlgComponent;
  let fixture: ComponentFixture<ImageViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryViewDlgComponent } from './inventory-view-dlg.component';

describe('InventoryViewDlgComponent', () => {
  let component: InventoryViewDlgComponent;
  let fixture: ComponentFixture<InventoryViewDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryViewDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryViewDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

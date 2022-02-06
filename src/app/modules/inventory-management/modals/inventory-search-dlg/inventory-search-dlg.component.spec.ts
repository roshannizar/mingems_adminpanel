import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySearchDlgComponent } from './inventory-search-dlg.component';

describe('InventorySearchDlgComponent', () => {
  let component: InventorySearchDlgComponent;
  let fixture: ComponentFixture<InventorySearchDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorySearchDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorySearchDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

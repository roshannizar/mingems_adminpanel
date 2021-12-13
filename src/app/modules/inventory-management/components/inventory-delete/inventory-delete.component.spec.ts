import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDeleteComponent } from './inventory-delete.component';

describe('InventoryDeleteComponent', () => {
  let component: InventoryDeleteComponent;
  let fixture: ComponentFixture<InventoryDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

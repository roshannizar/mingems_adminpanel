import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent implements OnInit {

  isBlock = false;
  inventoryGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createInventory();
  }

  createInventory() {
    this.inventoryGroup = this.fb.group({
      barcode: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      quantity: [0, Validators.required],
      unitPrice: [0, Validators.required],
      recuttingCost: [0, Validators.required],
      certificateCost: [0, Validators.required],
      commissionCost: [0, Validators.required],
      exportCost: [0, Validators.required],
      measurement: ['', Validators.required],
      weight: ['', Validators.required],
      priceCode: ['', Validators.required],
      lastPriceCode: ['', Validators.required]
    });
  }
}

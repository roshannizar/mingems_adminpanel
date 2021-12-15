import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InvestmentViewComponent } from 'app/modules/investment-management/components/investment-view/investment-view.component';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  isBlock = false;

  supplierGroup: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<InvestmentViewComponent>) { }

  ngOnInit(): void {
    this.createSupplier();
  }

  createSupplier() {
    this.supplierGroup = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      city: [''],
      contactNo: ['', Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }
}

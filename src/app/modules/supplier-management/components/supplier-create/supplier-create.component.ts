import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SupplierModel } from '../../models/supplier-model';
import { SupplierService } from '../../services/supplier.service';
import { SupplierViewComponent } from '../supplier-view/supplier-view.component';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  isBlock = false;

  supplier: SupplierModel;
  supplierGroup: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<SupplierViewComponent>,
    private supplierService: SupplierService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createSupplier();
  }

  createSupplier() {
    this.supplierGroup = this.fb.group({
      email: ['', Validators.email],
      name: ['', Validators.required],
      city: [''],
      contactNo: ['', Validators.required]
    });
  }

  onSave() {
    this.isBlock = true;
    this.supplier = Object.assign({}, this.supplier, this.supplierGroup.value);
    this.supplierService.createSupplier(this.supplier).subscribe(
      (result) => {
        this.isBlock = false;
        this.close('refresh');
        this.toastr.success('Supplier created successfully!', 'Success');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to save supplier');
      }
    );
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}

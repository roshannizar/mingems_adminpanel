import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SupplierModel } from '../../models/supplier-model';
import { SupplierService } from '../../services/supplier.service';
import { SupplierViewComponent } from '../supplier-view/supplier-view.component';

@Component({
  selector: 'app-supplier-update',
  templateUrl: './supplier-update.component.html',
  styleUrls: ['./supplier-update.component.css']
})
export class SupplierUpdateComponent implements OnInit {

  isBlock = false;

  supplierGroup: FormGroup;
  supplier: SupplierModel;

  constructor(public dialogRef: MatDialogRef<SupplierViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SupplierModel, private fb: FormBuilder,
    private supplierService: SupplierService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createSupplier();
    this.patchSupplier(this.data);
  }

  createSupplier() {
    this.supplierGroup = this.fb.group({
      id: [''],
      email: ['', Validators.required],
      name: ['', Validators.required],
      city: [''],
      contactNo: ['', Validators.required]
    });
  }

  patchSupplier(supplierModel: SupplierModel) {
    this.supplierGroup.patchValue({
      id: supplierModel.id,
      email: supplierModel.email,
      name: supplierModel.name,
      city: supplierModel.city,
      contactNo: supplierModel.contactNo
    });
  }

  onUpdate() {
    this.isBlock = true;
    this.supplier = Object.assign({}, this.supplier, this.supplierGroup.value);
    this.supplierService.updateSupplier(this.supplier).subscribe(
      (result) => {
        this.isBlock = false;
        this.close('refresh');
        this.toastr.success('Supplier updated successfully!', 'Updated');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to update supplier');
      }
    );
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}

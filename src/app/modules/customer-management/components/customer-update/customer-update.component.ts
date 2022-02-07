import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerModel } from '../../models/customer-model';
import { CustomerService } from '../../services/customer.service';
import { CustomerViewComponent } from '../customer-view/customer-view.component';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  isBlock = false;

  customerGroup: FormGroup;
  customer: CustomerModel;

  constructor(public dialogRef: MatDialogRef<CustomerViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerModel, private fb: FormBuilder,
    private customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createCustomer();
    this.patchCustomer(this.data);
  }

  createCustomer() {
    this.customerGroup = this.fb.group({
      id:[''],
      email: ['', Validators.email],
      firstName: ['', Validators.required],
      lastName: [''],
      contactNo: ['', Validators.required]
    });
  }

  patchCustomer(customerModel: CustomerModel) {
    this.customerGroup.patchValue({
      id: customerModel.id,
      email: customerModel.email,
      firstName: customerModel.firstName,
      lastName: customerModel.lastName,
      contactNo: customerModel.contactNo
    });
  }

  onUpdate() {
    this.isBlock = true;
    this.customer = Object.assign({}, this.customer, this.customerGroup.value);
    this.customerService.updateCustomer(this.customer).subscribe(
      (result) => {
        this.isBlock = false;
        this.close('refresh');
        this.toastr.success('Customer updated successfully!', 'Updated');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to update customer');
      }
    );
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}

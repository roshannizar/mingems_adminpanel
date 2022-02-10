import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerModel } from '../../models/customer-model';
import { CustomerService } from '../../services/customer.service';
import { CustomerViewComponent } from '../customer-view/customer-view.component';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  isBlock = false;

  customer: CustomerModel;
  customerGroup: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CustomerViewComponent>,
    private customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createCustomer();
  }

  createCustomer() {
    this.customerGroup = this.fb.group({
      email: ['', Validators.email],
      firstName: ['', Validators.required],
      lastName: [''],
      contactNo: ['', Validators.required]
    });
  }

  onSave() {
    this.isBlock = true;
    this.customer = Object.assign({}, this.customer, this.customerGroup.value);
    this.customerService.createCustomer(this.customer).subscribe(
      (result) => {
        this.isBlock = false;
        this.close('refresh');
        this.toastr.success('Customer created successfully!', 'Success');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to save customer');
      }
    );
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}

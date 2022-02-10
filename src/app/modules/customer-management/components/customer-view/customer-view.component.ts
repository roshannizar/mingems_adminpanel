import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerModel } from '../../models/customer-model';
import { CustomerService } from '../../services/customer.service';
import { CustomerCreateComponent } from '../customer-create/customer-create.component';
import { CustomerUpdateComponent } from '../customer-update/customer-update.component';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

  isBlock = false;
  isDelete = false;
  isDisplay = false;


  search: string;
  heading_text: string;

  customers = new Array<CustomerModel>();
  customer = new CustomerModel();

  constructor(private toastr: ToastrService, private customerService: CustomerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.isBlock = true;
    this.customerService.getCustomers().subscribe(
      (result) => {
        this.customers = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load customers');
      }
    );
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CustomerCreateComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getCustomers();
      }
    });
  }

  openUpdateDialog(model: CustomerModel) {
    const dialogRef = this.dialog.open(CustomerUpdateComponent, {
      width: '800px',
      data: model
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getCustomers();
      }
    });
  }

  closeModal() {
    this.isDisplay = false;
    this.customer = null;
    this.isDelete = false;
  }

  openViewModal(customer: CustomerModel) {
    this.isDisplay = true;
    this.heading_text = 'View Customer';
    this.customer = customer;
  }

  openDeleteModal(customer: CustomerModel) {
    this.isDelete = true;
    this.customer = customer;
    this.isDisplay = true;
    this.heading_text = `Delete ${customer.firstName}`;
  }

  refresh(): void {
    this.closeModal();
    this.getCustomers();
  }

  searchCustomer() {
    if (this.search !== '') {
      const tempCustomer = this.customers.filter(s => s.firstName.toLowerCase().match(this.search.toLowerCase()));

      if (tempCustomer.length === 0) {
        this.customers = this.customers.filter(s => s.lastName.toLowerCase().match(this.search.toLowerCase()));
      } else {
        this.customers = tempCustomer;
      }
    } else {
      this.getCustomers();
    }
  }
}

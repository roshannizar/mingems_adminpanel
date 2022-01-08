import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerModel } from '../../models/customer-model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {

  isBlock = false;
  name: string;

  @Input() customer: CustomerModel;
  @Output() deleted = new EventEmitter();

  constructor(private customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.name = this.customer.firstName;
  }

  confirmDelete(id: string) {
    this.isBlock = true;
    this.customerService.deleteCustomer(id).subscribe(
      (result) => {
        this.isBlock = false;
        this.deleted.emit();
        this.toastr.success('Deleted successfully!');
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, `Failed to delete ${id}`);
      }
    );
  }
}

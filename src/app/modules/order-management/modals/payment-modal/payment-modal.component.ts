import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderCreateComponent } from '../../components/order-create/order-create.component';
import { OrderModel, OrderStatus, PaymentStatus } from '../../models/order-model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  isBlock = false;

  paymentDate: Date;
  orderStatus: OrderStatus;
  paymentMode: PaymentStatus;

  order = new OrderModel();

  constructor(public dialogRef: MatDialogRef<OrderCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderModel, private orderService: OrderService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.order = this.data;
  }

  onSelectStatus(event) {
    this.order.orderStatus = event;
  }

  onSelectDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.order.paymentDate = event.value;
  }

  onSelectPaymentMode(event) {
    this.order.paymentType = event;
  }

  checkDate() {
    if (this.order.orderStatus === 0) {
      return true;
    } else {
      return false;
    }
  }

  onSave() {
    this.isBlock = true;
    this.orderService.createOrder(this.order).subscribe(
      (result) => {
        this.toastr.success('Order placed successfully! E-Invoice has been sent to the customer', 'Success');
        this.isBlock = false;
        this.close('refresh');
      },
      (error) => {
        this.toastr.error(error.message, 'Failed to place order');
        this.isBlock = false;
        this.close('close');
      }
    );
  }

  close(response: string) {
    this.dialogRef.close(response);
  }
}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderModel, OrderStatus, PaymentStatus } from '../../models/order-model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  isBlock = false;

  selectedOrderStatus = 0;

  orders = new Array<OrderModel>();
  order = new OrderModel();

  constructor(private toastr: ToastrService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders(0);
  }

  getOrders(index: number) {
    this.isBlock = true;
    this.orderService.getOrders(index).subscribe(
      (result) => {
        this.selectedOrderStatus = index;
        this.orders = result;
        this.isBlock = false;
      },
      (error) => {
        this.isBlock = false;
        this.toastr.error(error.message, 'Failed to load orders');
      }
    );
  }

  getOrderStatus(index: number) {
    if (OrderStatus.Pending === index) {
      return 'Pending';
    } else if (OrderStatus.Paid === index) {
      return 'Paid';
    } else {
      return 'Cancelled';
    }
  }

  getPaymentStatus(index: number) {
    if (PaymentStatus.Card === index) {
      return 'Card';
    } else {
      return 'Cash';
    }
  }

  getStatusColors(index: number) {
    let colors = 'mat-chip mat-focus-indicator mat-primary mat-standard-chip mat-chip-selected ';
    if (OrderStatus.Pending === index) {
      return colors += 'pending';
    } else if (OrderStatus.Paid === index) {
      return colors += 'paid';
    } else {
      return colors += 'cancelled';
    }
  }
}

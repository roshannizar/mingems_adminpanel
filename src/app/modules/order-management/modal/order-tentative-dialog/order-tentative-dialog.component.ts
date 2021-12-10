import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderViewComponent } from '../../components/order-view/order-view.component';
import { OrderDescriptionModel } from '../../models/order-description-model';
import { OrderModel } from '../../models/order-model';
import { ItemModel, OrderTentativeModel } from '../../models/order-tentative-model';
import { OrderInvoiceService } from '../../services/order-invoice.service';

@Component({
  selector: 'app-order-tentative-dialog',
  templateUrl: './order-tentative-dialog.component.html',
  styleUrls: ['./order-tentative-dialog.component.css']
})
export class OrderTentativeDialogComponent implements OnInit {

  isBlock = false;
  order = new OrderModel();
  updatedOrder = new OrderTentativeModel();

  constructor(public dialogRef: MatDialogRef<OrderViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderModel, private orderInvoiceService: OrderInvoiceService, private toastr: ToastrService) {
    this.order = data;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  editField(id: number) {
    document.getElementById('qty' + id).style.display = 'block';
    document.getElementById('unit' + id).style.display = 'block';
    document.getElementById('action' + id).style.display = 'block';
    document.getElementById('btn-edit' + id).style.display = 'none';
    document.getElementById('quantity' + id).style.display = 'none';
    document.getElementById('unitprice' + id).style.display = 'none';
  }

  cancelField(id: number) {
    document.getElementById('qty' + id).style.display = 'none';
    document.getElementById('unit' + id).style.display = 'none';
    document.getElementById('action' + id).style.display = 'none';
    document.getElementById('btn-edit' + id).style.display = 'block';
    document.getElementById('quantity' + id).style.display = 'block';
    document.getElementById('unitprice' + id).style.display = 'block';
  }

  saveField(orderLine: OrderDescriptionModel, id: number) {

    try {
      const order = new ItemModel();
      const qty = Number((<HTMLInputElement>document.getElementById('qty' + id)).value);
      const unit = Number((<HTMLInputElement>document.getElementById('unit' + id)).value);
      const isProductExist = this.updatedOrder.items.find(p => p.descriptionId === orderLine.descriptionId);

      if (!isProductExist) {

        orderLine.quantity = qty;
        orderLine.products.descriptionLines[0].unitPrice = unit;
        orderLine.unitPrice = unit;

        order.productId = orderLine.productId;
        order.descriptionId = orderLine.descriptionId;
        order.quantity = qty;
        order.unitPrice = unit;

        this.updatedOrder.items.push(order);
        document.getElementById('edit-tab' + id).style.borderLeft = '5px solid green';
      } else {
        isProductExist.descriptionId = orderLine.descriptionId;
        isProductExist.productId = orderLine.productId;
        isProductExist.quantity = qty;
        isProductExist.unitPrice = unit;

        orderLine.quantity = qty;
        orderLine.products.descriptionLines[0].unitPrice = unit;
        orderLine.unitPrice = unit;
      }
      const total = this.calculateTotal();
      this.order.orderTotal = total;
      this.updatedOrder.orderTotal = total;
      this.cancelField(id);

    } catch (ex) {
      this.toastr.error('Something went wrong while updating, Please contact the vendor!');
    }

  }

  calculateTotal() {
    let total = 0;
    this.order.orderLines.forEach((prod) => {
      const orderPrice = this.updatedOrder.items.find(p => p.descriptionId === prod.descriptionId);

      if (orderPrice) {
        total += orderPrice.quantity * orderPrice.unitPrice;
      } else {
        total += prod.products.descriptionLines[0].unitPrice * prod.quantity;
      }
    });

    return total;
  }

  updateOrder() {
    if (this.updatedOrder.items.length === 0) {
      this.toastr.warning('Nothing found to update!');
    } else {
      this.isBlock = true;
      this.updatedOrder.orderId = this.order.id;
      this.updatedOrder.orderTotal = this.order.orderTotal;
      this.orderInvoiceService.updateOrderTotal(this.updatedOrder).subscribe(
        (result) => {
          this.isBlock = false;
          this.toastr.success('Order details update successfully!');
          this.close();
        },
        (error) => {
          this.isBlock = false;
          this.toastr.error(error.message, 'Failed to update order details!');
        });
    }
  }

}
